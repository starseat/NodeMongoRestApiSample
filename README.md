# NodeMongoRestApiSample
Sample Rest API with MongoDB in NodeJS.


---

# MongoDB 설치 - Window

  1. https://www.mongodb.com/try/download/community 에서 download 및 설치
  2. `cmd` 열어서 `mongo` 입력
  3. 아래 명령어로 `user` 추가
  ~~~shell
  > `use admin`
  switched to db admin
  > `db.createUser({ user: 'jw', pwd: 'jwpwd', roles: ['root'] })`
  Successfully added user: { "user" : "jw", "roles" : [ "root" ] }
  > `exit`
  bye

  ~~~
  4. 새로 생성한 계정으로 접속
  ~~~shell
  > mongo admin -u jw -p jwpwd
  ~~~

# 데이터베이스 및 컬렉션 생성

1. 데이터베이스 생성
~~~shell
> `use nodejs`
switched to db nodejs
~~~

2. 데이터베이스 목록 확인
~~~shell
> `show dbs`
admin   0.000GB
config  0.000GB
local   0.000GB
~~~

3. 현재 사용 중인 데이터베이스
~~~shell
> `db`
nodejs
~~~

4. 컬렉션 생성 (도큐먼트 넣을시 자동 생성되지만 아래처럼 직접 생성도 가능)
~~~shell
> `db.createCollection('users')`
{ "ok" : 1 }
> `db.createCollection('comments')`
{ "ok" : 1 }
~~~


# CURD

## Create
~~~shell
> db.users.save({ name: 'tom', age: 30, married: false, comment: 'hello~~', createdAt: new Date() });
WriteResult({ "nInserted" : 1 })
> db.users.save({ name: 'jerry', age: 16, married: true, comment: 'bla bla bla', createdAt: new Date() });
WriteResult({ "nInserted" : 1 })

> db.users.find({ name: 'jerry' }, { _id: 1 })
{ "_id" : ObjectId("60d0a678177b175cda42f87a") }
> db.comments.save({ commenter: ObjectId('60d0a678177b175cda42f87a'), comment: "hello~~. jerry's comment.", createdAt: new Date() })
WriteResult({ "nInserted" : 1 })
~~~

## Read

### 전체 검색
~~~shell
> db.users.find({})
{ "_id" : ObjectId("60d0a671177b175cda42f879"), "name" : "tom", "age" : 30, "married" : false, "comment" : "hello~~", "createdAt" : ISODate("2021-06-21T14:47:13.403Z") }
{ "_id" : ObjectId("60d0a678177b175cda42f87a"), "name" : "jerry", "age" : 16, "married" : true, "comment" : "bla bla bla", "createdAt" : ISODate("2021-06-21T14:47:20.284Z") }
>
> db.comments.find({})
{ "_id" : ObjectId("60d0a7524ba85b9fe19f51f1"), "commenter" : ObjectId("60d0a678177b175cda42f87a"), "comment" : "hello~~. jerry's comment.", "createdAt" : ISODate("2021-06-21T14:50:58.843Z") }
~~~

### 조건

* `name`, `married` 필드만 가져오기
~~~shell
> db.users.find({}, { _id: 0, name: 1, married: 1 });
{ "name" : "tom", "married" : false }
{ "name" : "jerry", "married" : true }
~~~

* `age` 가 `20 초과`, `married` 가 `false`
> 연산자: $gt(초과), $gte(이상), $lt(미만), $lte(이하), $ne(Not Equal), $or, $in(배열 요소 중 하나)
~~~shell
> db.users.find({ age: { $gt: 20 }, married: false }, { _id: 0, name: 1, age: 1})
{ "name" : "tom", "age" : 30 }
~~~

* `$or` 사용
~~~shell
> db.users.find({ $or: [{ age: { $gt: 20 } }, { married: true }] }, { _id: 0, name: 1, age: 1 })
{ "name" : "tom", "age" : 30 }
{ "name" : "jerry", "age" : 16 }
~~~

* 정렬
> -1: 내림차순 / 1: 오름차순
~~~shell
> db.users.find({}, { _id: 0, name: 1, age: 1 }).sort({ age: -1 })
{ "name" : "tom", "age" : 30 }
{ "name" : "jerry", "age" : 16 }
>
> db.users.find({}, { _id: 0, name: 1, age: 1 }).sort({ age: 1 })
{ "name" : "jerry", "age" : 16 }
{ "name" : "tom", "age" : 30 }
~~~

* limit
~~~shell
> db.users.find({}, { _id: 0, name: 1, age: 1 }).sort({ age: 1 }).limit(1)
{ "name" : "jerry", "age" : 16 }
~~~

* skip
~~~shell
> db.users.find({}, { _id: 0, name: 1, age: 1 }).sort({ age: 1 }).limit(1).skip(1)
{ "name" : "tom", "age" : 30 }
~~~

## Update
~~~shell
> db.users.update({ name: 'tom' }, { $set: { comment: 'Wow~~' }})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
~~~

## Delete
~~~shell
> db.users.save({ name: 'money', age: 1, married: false, comment: 'Delete Sample', createdAt: new Date() });
WriteResult({ "nInserted" : 1 })
> db.users.remove({ name: 'money' })
WriteResult({ "nRemoved" : 1 })
~~~

