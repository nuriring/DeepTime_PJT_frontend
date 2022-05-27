# [DEEPTIME] 영화 추천 사이트
## 프로젝트 개요
### 팀 구성원

- 팀장 : 김누리
- 팀원 : 이호준

### 프로젝트 기간

2022.05.20(금) ~ 2022.05.26(목)

### 일정관리

- `Notion`을 이용한 날짜별 일정관리

### 로고, 사이트 이름

![logo](README.assets/logo.jpg)

바쁜 현대인들에게 빠른 영화추천과 결말을 포함한 요약본을 제공하여 짧은 시간에 영화를 볼 수 있게 끔 하여 `농도깊은 시간`을 제공한다는 의미로 DEEPTIME 이라는 사이트 이름을 지었다.

로고는 깊다 `Deep`와 담그다 `dip` 이 발음이 유사하기 때문에 영화를 볼때 자주 먹는 간식인 나쵸를 소스에 찍는 모습을 로고에 담아냈다.

### 개발환경

- back-end : django (3.2.12)
- front-end : Vue.js ()

### ERD

![image-20220526101821832](README.assets/image-20220526101821832.png)



### 주요 기능

1. 회원가입 시 등록하는 장르를 기반으로 한 영화추천
2. 1시간 30분 ~ 2시간의 긴 러닝타임을 20분으로 요약해준 결말포함 요약리뷰 영상 제공
3. OTT별 서비스 영화를 확인하는 서비스 제공

<hr>
## 사용방법

```bash
# back
python manage.py runserver
```



```bash
# front
```



```js
// @/views/MovieDetailView.vue

export default {
    name: 'MovieDetail',
    components: { ReviewList },
    data() {
      return {
        moviePk: this.$route.params.moviePk,
        searchKeyword: null,
        videos: [],
        selectedVideo: null,
        movieVideo: null,
        genres: [],
        tmdbKey : ''
      
      }
    },
    computed: {
      ...mapGetters(['movie',]),
      likeCount() {
        return this.movie.like_users?.length
      }
    },
    methods: {
      ...mapActions([
        'fetchMovie',
        'likeMovie',
      
      ]),
      getVideo() {
        axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.moviePk}/videos?api_key=${this.tmdbKey}&language=ko-KR`)
        .then((res) => {
          console.log(res.data.results[0].key)
          this.movieVideo = (res.data.results[0].key)
        })
        .catch((err) => {
          console.log(err)
        })
      }
 ...
        
data -> tmdbKey에 본인의 tmdb API키를 작성해준다.
```



```js
// @/components/ReviewList.vue 

export default {
  name: 'ReviewList',
  props: { reviews: Array,
           moviePk: Number,
           movie: Object },
  data() {
    return{
      show: true,
      video:{} ,
      selectedItem : 1,
      youtubeApi : 'AIzaSyBQzAXG6v5fbEqbNjGh5kMbpQS-FU1d9D8'
    }
  },
  methods:{
    videoOn() {
      const keyword = this.movie.title
       axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${keyword}+결말포함&key=${this.youtubeApi}`)
        .then(res => {
          console.log(res.data)

          // this.videos = res.data.items
          this.video = res.data.items[0]
          // console.log(this.videos)
        })
        .catch(err => {
          console.log(err)
        })
    },
    toggle() {
      this.show = !this.show;
    }

  },
    
data -> youtubeApi에 본인의 youtube API키를 작성해준다.    
```



## 구현 기능 코드리뷰


### 0. Main

- 장르 기반 추천 서비스를 제공해야 하기 때문에 회원가입을 한 유저만 접근이 가능하도록 만들었다.

![image-20220526104438232](README.assets/image-20220526104438232.png)

- 가입이 되지 않은 사용자는 회원가입 페이지로, 기존에 가입이 되어 있는 사용자는 로그인 페이지로 이동할 수 있는 버튼을 만들어 주었다.

```javascript
// router/index.js

router.beforeEach((to, from, next) => {

  store.commit('SET_AUTH_ERROR', null)

  const { isLoggedIn } = store.getters

  const noAuthPages = ['login', 'signup', 'main']

  const isAuthRequired = !noAuthPages.includes(to.name)

  if (isAuthRequired && !isLoggedIn) {
    alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.')
    next({ name: 'login' })
  } else {
    next()
  }

  if (!isAuthRequired && isLoggedIn) {
    next({ name: 'movies' })
  }
})
```

### 1. User

#### 1-1. Login / Logout

![image-20220526104359522](README.assets/image-20220526104359522.png)

-  `dj_rest_auth`를 통해 Login / Logout 기능이 구현된다.
- 로그인 된 회원은 발급받은 토큰값을 이용해 인증을 하게 된다.

#### 1-2. Signup

![image-20220526214826096](README.assets/image-20220526214826096.png)

- `dj_rest_auth.registration`라는 Third Party App을 등록하여 Signup을 구현하였다. 아이디, 비밀번호, 장르를 담아 서버로 POST요청을 보내면 유효성검사를 마친 뒤 회원가입을 할 수 있었다.
- 장르를 기반으로 영화추천을 해주기 때문에 선호하는 장르를 선택하지 않는다면 회원가입이 되지 않게끔 만들어 주었다.

#### 1-3. Profile

![image-20220526215101052](README.assets/image-20220526215101052.png)

- 계정별로 프로필 페이지를 접근 할 수 있게 만들었다. 해당 페이지에서는 작성한 게시글 및 리뷰를 열람할 수 있게 하였다. 게시글 혹은 리뷰를 선택한다면 해당 게시글 및 리뷰의 상세페이지로 이동할 수 있도록 router link를 걸어 놓았다.

### 2. 게시판

#### 2-1. 게시판 메인

![image-20220526220933198](README.assets/image-20220526220933198.png)

- 게시판의 메인 페이지다. 게시판의 이름은 컨셉과 걸맞게 `본자들`이라는 이름을 사용하였다. 결말과 관련된 내용에 접근하고 싶은 사용자들과 이미 영화를 시청한 사람들이 자유롭게 대화를 나눌 수 있는 공간으로 만들자는 컨셉으로 구현하였다.

#### 2-2. 게시판 글 작성

![image-20220526215449711](README.assets/image-20220526215449711.png)

- 게시판 페이지는 세가지 카테고리로 분류하였다.
  - 결말포함 : 사용자들이 본인의 감상평 및 줄거리 요약을 작성할 수 있는 공간이다.
  - 세계관요약 : 이미 시리즈가 많이 진행된 영화를 처음으로 접하는 사람들을 위해 시리즈 요약 게시글을 올릴 수 있는 공간이다.
  - 이스터에그 : 영화를 보고 숨겨진 이스터에그 및 해석에 대한 내용들을 공유할 수 있는 공간이다.

#### 2-3. 게시판 상세페이지

![image-20220526215724826](README.assets/image-20220526215724826.png)

- 상세페이지에서는 제목과 내용, 글쓴이에 대한 정보를 제공한다. 
- 글을 재밌게 읽었다면 좋아요로 호감을 표시할 수 있고, 댓글로 다양한 의견을 나눌 수 있다.

### 3. 영화

#### 3-1. 영화추천 메인페이지

![image-20220526215835943](README.assets/image-20220526215835943.png)

- 메인 기능인 영화추천 페이지다. 상단 검색바를 통해서 원하는 영화가 검색 가능하며, 그 밑으로는 영화목록을 인기순으로 제공한다.

![image-20220526215943914](README.assets/image-20220526215943914.png)

- 아래 있는 버튼을 클릭하면 회원가입시 기입한 장르를 바탕으로 추천영화를 제공해준다.
- 영화의 포스터를 클릭하면 해당 영화의 상세정보를 제공한다.

#### 3-2. 영화 상세정보

![image-20220526220419751](README.assets/image-20220526220419751.png)

![image-20220526220437269](README.assets/image-20220526220437269.png)

![image-20220526220508519](README.assets/image-20220526220508519.png)

![image-20220526220523074](README.assets/image-20220526220523074.png)

- 해당 영화의 스틸컷 및 포스터정보를 제공한다.
- 평점을 제공하고 영화 좋아요 기능을 제공한다.
- 예고편을 유튜브를 통해 볼 수 있는 기능을 제공한다.
- 메인 기능 중 하나인 결말포함 컨텐츠를 포함하여 긴 러닝시간을 할애하기 어려운 사람들을 위해 20분 가량의 줄거리 및 결말포함 요약영상을 제공한다.
- 사용자들이 영화에 대한 한줄평을 작성 할 수 있는 리뷰 폼을 제공한다.

#### 3-3. 리뷰작성

![image-20220526220721253](README.assets/image-20220526220721253.png)

#### 3-4. OTT 지도

![image-20220526220740477](README.assets/image-20220526220740477.png)

- 한국에서 제공하는 여러 OTT서비스가 어떤 영화를 제공하는지를 알아보는 OTT지도 서비스를 제공한다.

![image-20220526220836711](README.assets/image-20220526220836711.png)

- OTT아이콘을 누르면 해당 영화들의 목록을 보여주고 OTT서비스로 갈 수 있는 링크를 제공한다.

### 어려웠던 점

#### 1. 데이터 구축

- TMDB API를 이용하여 사이트 구축에 필요한 데이터를 CSV파일로 받아와서 저장해야했다. 

```python
import requests
import pandas as pd
import os
import csv

# 장르 데이터 뽑아오기
TMDB_API_KEY = ''

result = pd.DataFrame()
def make_csv():
    global result
    # 1페이지부터 500페이지까지 (페이지당 20개, 총 10,000개)
    for i in range(1):
        request_url = f"https://api.themoviedb.org/3/genre/movie/list?api_key={TMDB_API_KEY}&language=ko-KR"
        movies = requests.get(request_url).json()
        # print(movies)
        datafield = pd.DataFrame(movies['genres'])
        # print(datafield)
        datafield_preprocessed = datafield[
            ['id', 'name']]
    # print(datafield_preprocessed)
        # result = datafield_preprocessed
        
        result = pd.concat([result, datafield_preprocessed], ignore_index=True)
    result.to_csv('genre.csv', encoding="utf-8-sig") 

make_csv()

# 영화 데이터 뽑아오기
def make_csv():
    # 1페이지부터 500페이지까지 (페이지당 20개, 총 10,000개)
    for i in range(1, 10):
        request_url = f"https://api.themoviedb.org/3/movie/popular?api_key={TMDB_API_KEY}&language=ko-KR&page={i}"
        movies = requests.get(request_url).json()
        # print(movies)
        datafield = pd.DataFrame(movies['results'])
        # print(datafield)
        datafield_preprocessed = datafield[
            ['backdrop_path', 'genre_ids', 'id', 'overview', 'popularity', 'release_date', 'vote_average', 'poster_path', 'title']]
    # print(datafield_preprocessed)
        result = datafield_preprocessed
        result = pd.concat([result, datafield_preprocessed], ignore_index=True)
    result.to_csv('movie.csv', encoding="utf-8-sig") 

make_csv()




# 영화 장르 중개테이블 데이터 뽑아오기
windows_user_name = os.path.expanduser('~')
start_page = 1
end_page = 500 #페이지 수
for page in range(start_page, end_page+1):
    url = f'https://api.themoviedb.org/3/movie/popular?api_key={TMDB_API_KEY}&language=ko&region=kr&page={page}'
    data = requests.get(url).json()

    df = pd.DataFrame(data['results'])
    df_preprocessed = df[
        ['genre_ids', 'id']]

    result = pd.concat([result, df_preprocessed], ignore_index=True)
    print(page)


df = pd.DataFrame()

# result.rename(columns={'id':'movie_id'})

id = 0
for i in range(0, len(result)):
    for genre in result.iat[i,0]:
        df = df.append({'movie_id':int(result.iat[i,1]), 'genre_id':int(genre)} , ignore_index=True)
        id += 1

print(df)




df.to_csv(f'{windows_user_name}/Desktop/movie_genre.csv', encoding="utf-8-sig")





# OTT 데이터 구축

data = pd.read_csv("out1.csv", usecols=[0])
selectdata = pd.DataFrame(data, columns=['id'])

df_dict = data.to_dict()

dic_val = df_dict['id'].values()
dic_list = list(dic_val)
# print(dic_list)


total_data = {}
for i in dic_list:

    request_url = f"https://api.themoviedb.org/3/movie/{i}/watch/providers?api_key={TMDB_API_KEY}"
    movies = requests.get(request_url).json()
    if movies.get('results'):
        movie = movies['results']
        if movie.get('KR'):
            kr_movie = movie['KR']
            if kr_movie.get('flatrate'):
                flatrate_list = kr_movie.get('flatrate')
                for flatrate in flatrate_list:
                    total_data[i] = flatrate['provider_name']
            else:
                continue
        else:
            continue
    else:
        continue
    
with open('./test2.csv', 'w', encoding='UTF-8') as f:
    w = csv.writer(f)
    w.writerow(total_data.keys())
    w.writerow(total_data.values())

```

##### 1-1. 장르 데이터 구축

- 제일 먼저 TMDB에 있는 장르분류들을 csv파일로 데이터 저장하였다.
- movie에 genre_id가 foreign key로 담길것이기 때문에 저장해주었다.

##### 1-2. 영화 데이터 구축

- TMDB POPULAR API에 접근하여 1페이지부터 500페이지까지 약 10000개의 영화 데이터를 받아왔다.
- 장르데이터와 영화데이터를 받아서 csv로 변환하기 위해 사용한 라이브러리는 `pandas`이다.

##### 1-3. 영화와 장르간 중개테이블 구축

- 우리팀에서 한 방법이 정확하다고는 할 수 없지만, 중개테이블이 자동으로 생성되지 않기 때문에, 영화데이터의 장르를 순회하면서 장르 API와 비교하여 영화가 어떤 genre_id를 가지고 있는지 확인하여 저장하였다.
- 장르데이터는 영화데이터에 배열로 저장되기 때문에 이렇게 순회하는 방법 외에는 다른 방법이 없었기 때문에 해당 방법을 사용했다.

##### 1-5. OTT 데이터 구축

- 받아온 영화데이터의 Id값을 pd를 통해 데이터프레임으로 바꾸고 이것을 리스트로 바꿔서 순회를 돌며 OTT API에 접근하여 한국지역에서 어떤 OTT서비스에서 제공되는지를 저장하여 데이터베이스에 저장하였다.

- 순회하기위해 많은 시간이 걸렸고, 한국에서 서비스되지 않는 영화가 다수 있었기 때문에 영화를 다 받아오지는 못했지만 충분한 데이터를 구축 할 수 있었다.

#### 2. Lifecycle Hook

- Create를 사용하여 현재 접속된 유저의 정보와 프로필에 담긴 정보를 받아왔다.
- 이를 이용하여 현재 유저의 선호장르를 받아 올 수 있었고 장르별 영화추천 기능을 구현 할 수 있었다.
- 하지만 새로고침을 하거나 다음날 서버를 키면 정보가 `undifined`로 할당되지 않은 값을 갖는 문제가 있다는 것을 확인하였다.
- 해당 문제는 해결하지 못했지만, create & mount 그리고 부모 및 자식간의 실행순서를 좀 더 학습해야겠다는 생각이 들었다.

### 느낀점

- 김누리 :

1. 무한 수정 ERD   - 기획에 충분한 시간을 짰고, 아이디어도 컨셉이 명확하여 ERD 수정이 많지 않을 것이라 생각했지만 모델링이 실제로 구현되기 까지 큰 장애물이 많다는 것을 배웠다. 물론 그 과정에서 시리얼라이저로 JSON 데이터를 어떻게 송출하는지 비약적으로 짧은 시간에 많은 것을 배울 수 있었다. 이러한 과정 속에서 ERD 를 수정하는 것에 대한 두려움 보다는 ERD를 수정했다면 수정했다고 팀원과 소통하는 것이 훨씬더 중요하다는 것을 배웠다. 타임키퍼 팀은 이러한 부분에서 정말 원활히 진행이 되었고, 무한한 수정 끝에서도 마감 시간에 쫓기는 것 없이 제출이 가능했다. 
2. 목업의 중요성   - 피그마를 이용해서 목업을 짤 때 정말 상세하게 짰다, 모든 뷰 컴포넌트 구조를 분리해서 짰고 디자인도 실제 디자인과 유사하게 구성을 해였다. 특히 CSS를 할 때 목없이 없다면 팀원과 동일한 디자인으로 일을 진행할 수 없었을 것이다. 컬러보드를 공유하고 대략적인 디자인을 서로 알고 있기 때문에 많은 시간을 투자한 백에도 불구하고 무사히 프론트를 마칠수 있었다. 
3. 충돌을 피하기 위한 기능 나누기   - 기능을 나눠서 진행했음에도 불구하고 깃 브랜치를 활용해서 최대한 머지를 막고자 했다. 머지하는데 시간이 많이 든다면 서로 간에 협업이 잘 안되는 느낌을 받을 것이고 또한 그 자체로 시간낭비가 되기 때문이다. 깃을 직접적으로 장기 프로젝트에 활용할 수 있어서 브랜치 기능을 많이 배울 수 있었다. 수시로 어떤 부분을 만지고 있는지 여쭤보고 확인하고 겹치지 않게 하고자 노력했다.  
4. 추가 기능 보다는 지금 있는 기능을 완성해서 시연할 수 있게 하기   - 교수님의 말씀처럼 자동차는 안되더라도 킥보드는 되서 달릴 수 있게 해야 한다는 것을 알 수 있었다. 정말 짧은 시간안에 두명이서 백과 프론트를 맡아서 웹페이지 하나를 만들어야 했고, 초반에 짜 놓은 목업에 너무 많은 기능이 담겨 있는 거 같다는 생각이 들면서 불안감이 엄습하기 시작했다. 남은 시간을 계산해서 과감하게 추가 기능을 포기하고 페이지 완성도를 높이는데 집중했다. 이러한 과정 속에서 하루 정도 밤을 꼴딱 새기도 하였지만 잘 따라와준 팀원에게 감사의 인사를 전한다

- 이호준 : 처음에는 일주일 내로 모든 기능을 다 구현할 수 있을까 막막함에 많은 걱정을 했다. back, front 구분을 해서 프로젝트를 진행해본적도 없고 drf를 이용하여 서버를 구축한 후 vue에서 요청을 보내 데이터를 응답받는 과정도 진행해보지 않았기 때문에 많은 어려움이 있을거라고 생각했다. 이번 프로젝트를 통하여 느낀점은 ~~ 가지이다.

  1. 기획은 최대한 상세히

     기획단계를 2-3일 정도 투자하였다. 기획은 아이디어공유, 목업제작, ERD작성, 컴포넌트 구조도 작성을 통해 하였다. 기획에 1/3 정도의 시간을 투자했지만 진행과정 중 기획했던 것과 다른 과정이 많았다. 그로 인해 ERD를 매번 수정하며 기능을 수정 및 제거하는 부분도 있었고 컴포넌트 구조도 많이 변경되었다. 이럴거면 기획을 왜 하냐는 생각이 들 수도 있지만 기획에 그만큼의 시간을 투자하지 않았다면 아직 프로젝트의 반도 끝내지 못했을 것이다. 기획은 최대한 상세히 크게 하는것이 좋다는 생각이 들었다	

  2. 계획적인 진행

     하루하루 목표치를 설정하고 그거를 마무리 하는 방향으로 진행하였다. 어떤날은 모두 구현하지 못한 날도 있었고 어떤 날은 모두 구현하고 그 이상의 목표치를 달성한 날도 있었다. 이렇게 계획적으로 진행을 한다면 마감시간에 쫓기지 않을 확률이 더 높아질 것이라고 생각한다.

  3. 확실한 분업

     기능별로 분업을 하였고 최대한 소통을 많이 하였다. 그로 인해 git에 commit을 남기거나 push pull 과정에서 충돌을 최대한 줄일 수있었다. 확실한 분업과 많은 소통은 협업을 더욱 더 생산성있게 만들어 줄 것이다.

​       처음으로 진행한 장기? 프로젝트였다. 협업 과정에서 아이디어와 방향성이 잘 맞았기 때문에 확실한 설계방향을 잡을 수 있었고 원할		하게 프로젝트를 진행할 수 있었다. 짧은 기간이지만 많은 것을 배웠고 한 학기의 마무리를 확실히 한 것 같다는 생각이 들었다.

