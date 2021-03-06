from django.conf.urls import patterns, url, include
from rest_framework_nested import routers

from orders.views import OrderViewSet, ProductOrderViewSet, AdminOrderView
from authentication.views import AccountViewSet, LoginView, LogoutView
from picture.views import PictureViewSet
from product.views import CategoryProductViewSet, ProductViewSet, SingleProductViewSet, CategoriesViewSet


from sever.views import IndexView

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'picture', PictureViewSet)
router.register(r'category', ProductViewSet)
router.register(r'categories', CategoriesViewSet)
router.register(r'product', SingleProductViewSet)
router.register(r'simpleProduct', ProductViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'order', ProductOrderViewSet)
router.register(r'ordersAdmin', AdminOrderView)

product_router = routers.NestedSimpleRouter(router, r'category', lookup='category')
product_router.register(r'category', CategoryProductViewSet)

urlpatterns = patterns(
    '',
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(product_router.urls)),
    # url(r'^api/v1/', include(orders_router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url('^.*$', IndexView.as_view(), name='index'),
)