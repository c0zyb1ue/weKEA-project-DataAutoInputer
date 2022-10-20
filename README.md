weKEA web service가 돌아가기 위해 필요한 사전 데이터를 자동으로 입력하는 프로그램

프로그램 실행시 데이터를 입력해주는 table 목록
- categories
- products
- images
- product_options
<br>
다음과 같은 순서로 table에 데이터가 들어가게 된다.
> 들어가는 데이터 목록 및 사진 원본은 포함된 csv파일과 사진 폴더 참고.

프로그램 이용방법
1. mysql에서 weKEA schema를 삭제(DROP DATABASE weKEA;)
2. weKEA schema를 다시 생성 (CREATE DATABASE weKEA;) 
1,2번을 통해 weKEA를 초기화 시켜준다.
3. local 환경에서 각자 WEKEA-BACKEND 디렉토리로 이동 후 dbmate up을 통해 table들을 한 번에 만들어준다.
4. Desktop에서 이 github repository를 git clone을 받는다.
5. 만들어진 디렉토리 안에서 npm install -> npm start 하면 자동으로 데이터가 들어가게된다.

