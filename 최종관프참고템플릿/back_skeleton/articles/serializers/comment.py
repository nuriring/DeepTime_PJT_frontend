from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import Comment

User = get_user_model()

#하나의 시리얼라이저를 이용해서 crud를 다같이 하기 때문에 read_only 필드가 필요한거임
# CUD => validation -> 검증은 cud에서 발생
# R => Data serializing -> read 할 때 어떤 게시글에 달려있는지 알 수 있음
class CommentSerializer(serializers.ModelSerializer):
    
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', 'username')

    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('pk', 'user', 'content', 'article',)
        read_only_fields = ('article', ) #게시글 알려주는게 CUD 할때 검증할때까지 필요하냐? 아니라는거지
