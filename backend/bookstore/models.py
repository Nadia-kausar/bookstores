from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100, default="Unknown Author")
    description = models.TextField(default="No description")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    cover_image = models.ImageField(upload_to='book_covers/', blank=True, null=True)  # Uploads to MEDIA_ROOT/book_covers/

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"Order #{self.id} - {self.user.username}"

    @property
    def get_order_total(self):
        return sum(item.get_total for item in self.items.all())


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.book.title}"

    @property
    def get_total(self):
        return self.book.price * self.quantity
