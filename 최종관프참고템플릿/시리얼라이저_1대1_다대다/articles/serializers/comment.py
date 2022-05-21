from rest_framework import serializers
from ..models import Article, Comment

class CommentSerializer(serializers.ModelSerializer): #게시글 디테일과 게시글 목록처럼 필드를 공유할 수 없는경우 시리얼라이저를 나눠주는거임 댓글은 그럴필요가 없지?

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('article',) #포린키를 시리얼라이저 만들 때 사용할 수 있도록 리드 온리로 유효성 검사에서 빈값으로 인식하지 않도록 따로 정보를 미리 빼두는 격
        #이렇게 쓸수 있는 이유는 해당 field의 all에 article이 포함되어 있기 때문이다