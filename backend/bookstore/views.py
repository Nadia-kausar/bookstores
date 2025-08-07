from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status

from .models import Book, Order, OrderItem


# -------------------- SIGNUP --------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        'token': token.key,
        'message': 'Signup successful'
    }, status=status.HTTP_201_CREATED)


# -------------------- LOGIN --------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'message': 'Login successful'
        })

    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# -------------------- GET ALL BOOKS --------------------
@api_view(['GET'])
@permission_classes([AllowAny])
def get_books(request):
    books = Book.objects.all()
    data = [
        {
            "id": book.id,
            "title": book.title,
            "author": book.author,
            "description": book.description,
            "price": float(book.price),
            "stock": book.stock,
            "cover_image": book.cover_image,
        }
        for book in books
    ]
    return Response(data, status=status.HTTP_200_OK)


# -------------------- PLACE ORDER --------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
    cart = request.data.get('cart', [])

    if not cart or not isinstance(cart, list):
        return Response({'error': 'Cart must be a non-empty list'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        order = Order.objects.create(user=request.user, complete=True)

        for item in cart:
            book_id = item.get('book_id')
            quantity = item.get('quantity', 1)

            if not book_id:
                return Response({'error': 'Each item must include book_id'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                book = Book.objects.get(id=book_id)
            except Book.DoesNotExist:
                return Response({'error': f'Book with ID {book_id} not found'}, status=status.HTTP_404_NOT_FOUND)

            OrderItem.objects.create(order=order, book=book, quantity=quantity)

        return Response({
            'message': 'Order placed successfully',
            'order_id': order.id
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({
            'error': 'An unexpected error occurred',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# -------------------- GET USER ORDERS --------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_orders(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')

    data = []
    for order in orders:
        items = [
            {
                "title": item.book.title,
                "author": item.book.author,
                "quantity": item.quantity,
                "price": float(item.book.price),
                "subtotal": float(item.get_total),
            }
            for item in order.items.all()
        ]

        total = sum(item['subtotal'] for item in items)

        data.append({
            "order_id": order.id,
            "created_at": order.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            "complete": order.complete,
            "items": items,
            "total": total
        })

    return Response(data, status=status.HTTP_200_OK)
