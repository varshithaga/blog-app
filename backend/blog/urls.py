from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CommentViewSet, TagViewSet,LikeViewSet,UserViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='posts')
router.register(r'comments', CommentViewSet, basename='comments')
router.register(r'tags', TagViewSet, basename='tags')
router.register(r'likes', LikeViewSet, basename='like')
router.register(r'user', UserViewSet, basename='user')

urlpatterns = router.urls
