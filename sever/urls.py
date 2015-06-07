from django.conf.urls import patterns, url, include
from rest_framework_nested import routers

from authentication.views import AccountViewSet, LoginView, LogoutView
from posts.views import PostViewSet, AccountPostsViewSet
from picture.views import PictureViewSet
from product.views import CategoryProductViewSet, ProductViewSet, SingleProductViewSet, CategoriesViewSet, \
    SimpleSingleProductViewSet


from sever.views import IndexView

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'posts', PostViewSet)
router.register(r'picture', PictureViewSet)
router.register(r'category', ProductViewSet)
router.register(r'categories', CategoriesViewSet)
router.register(r'product', SingleProductViewSet)
router.register(r'simpleProduct', SimpleSingleProductViewSet)

accounts_router = routers.NestedSimpleRouter(router, r'accounts', lookup='account')
accounts_router.register(r'posts', AccountPostsViewSet)

product_router = routers.NestedSimpleRouter(router, r'category', lookup='category')
product_router.register(r'category', CategoryProductViewSet)

urlpatterns = patterns(
    '', url(r'^api/v1/', include(router.urls)), url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/', include(product_router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url('^.*$', IndexView.as_view(), name='index'),
)