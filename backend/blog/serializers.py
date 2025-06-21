from rest_framework import serializers
from .models import Post, Comment, Like, Tag
from django.contrib.auth.models import User

# Tag Serializer
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

# Post Serializer
class PostSerializer(serializers.ModelSerializer):
    tag_names = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )
    tags = TagSerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    author = serializers.CharField(source='author.username', read_only=True)  


    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'created_at', 'updated_at', 'is_published', 'tags','likes_count', 'comments_count','image','tag_names']
        extra_kwargs = {
            'author': {'read_only': True}
        }

    def create(self, validated_data):
        tag_names = validated_data.pop('tag_names', [])        
        validated_data.pop('author', None)

        author = self.context['request'].user
        post = Post.objects.create(author=author, **validated_data)

        for name in tag_names:
            tag, _ = Tag.objects.get_or_create(name=name.strip())
            post.tags.add(tag)

        return post
    
    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()


# Recursive Comment Serializer for nested replies
class RecursiveCommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    user = serializers.StringRelatedField(read_only=True)
    parent = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'content', 'created_at', 'parent', 'replies']

    def get_replies(self, obj):
        return RecursiveCommentSerializer(obj.replies.all(), many=True).data


# Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    replies = serializers.SerializerMethodField()
    parent = serializers.PrimaryKeyRelatedField(queryset=Comment.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'user', 'content', 'created_at', 'parent', 'replies']

    def get_replies(self, obj):
        return RecursiveCommentSerializer(obj.replies.all(), many=True).data


# Like Serializer
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'post']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']