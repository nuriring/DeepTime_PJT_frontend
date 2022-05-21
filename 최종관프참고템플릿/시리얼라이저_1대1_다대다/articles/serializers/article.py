from rest_framework import serializers
from ..models import Article, Comment
from .comment import CommentSerializer
from .card import CardSerializer


class ArticleListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = ('id', 'title',) #내가 원하는 필드만 json으로 응답 가능


class ArticleSerializer(serializers.ModelSerializer): #디테일정보에서 제공하는 json 출력형태가 달라지므로 그럴땐 시리얼라이저를 따로 만들어줘야함
    # 특정게시글에 작성된 댓글 목록 출력하기 -> 기존필드 오버라이드
    # 1번 방식
    # comment_set = serializers.PrimaryKeyRelatedField(many=True, read_only=True) 
    # #pk를 사용해서 관계된 대상을 나타내는데 사용할 수 있음, 필드가 to mamy relationships를 나타내는데 사용되는 경우 many=True 필요, comment_set 필드값을 form-data로 받지 않으므로 read_only=True 설정 필요
    
    # 2벙 방식(Nested) 모델관계상 아티클은 댓글에 포함되어 있으므로 -> 아티클에서 아티클을 참조하고 있는 댓글을 중첩해서 불러올 수 있음
    comment_set = CommentSerializer(many=True, read_only=True) #comment_set은 역참조 필드명, 1번 방식은 pk만 가지고 오는 반면에, 2번 방식의 경우 commentserializer에서 설정한 필드값이 출력된다
    comment_count = serializers.IntegerField(source='comment_set.count', read_only=True) #특정게시글에 작성된 댓글의 개수 구하기 -> 새로운 필드 추가
    
    # 다대다는 중첩은 아니니까 서로가 서로의 시리얼라이저를 사용할 수 있다고 생각하면 됨
    cards = CardSerializer(many=True, read_only=True) #cards는 내가 모델에서 설정해준 related_name

    class Meta:
        model = Article
        fields = '__all__'


