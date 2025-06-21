from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CommentViewSet, TagViewSet,LikeViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'tags', TagViewSet)
router.register(r'likes', LikeViewSet, basename='like')

urlpatterns = router.urls
