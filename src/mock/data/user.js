import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];
const tableOpTion = [
  {
   value:Mock.mock(Mock.Random.csentence(2,3)),
   label:"全部",
   isHide:true,
   list:[]
},
{
 value:Mock.mock(Mock.Random.csentence(2,3)),
 label:"用户ID",
 isHide:true,
 list:["请输入用户ID"]
},
{
 value:Mock.mock(Mock.Random.csentence(2,3)),
 label:"账号",
 isHide:true,
 list:["请输入用户账号"]
},
{
 value:Mock.mock(Mock.Random.csentence(2,3)),
 label:"昵称",
 isHide:true,
 list:["请输入用户昵称"]
},
{
 value:Mock.mock(Mock.Random.csentence(2,3)),
 label:"用户编号",
 isHide:true,
 list:["请输入用户编号"]
},
{
 value:Mock.mock(Mock.Random.csentence(2,3)),
 label:"首页推荐",
 isHide:true,
 list:["直播推荐","置顶推荐"]
},
{
 value:Mock.mock(Mock.Random.csentence(2,3)),
 label:"列表推荐",
 isHide:true,
 list:["推荐","不推荐"]
}
];

for (let i = 0; i < 248; i++) {
  Users.push(Mock.mock({
    userId:Mock.Random.natural(1000,5999),
    pic:Mock.Random.dataImage('40x40', ''),
    name: Mock.Random.cname(),
    derection:"PGC",
    size:"邮箱注册",
    time:Mock.Random.now(),
    bool:Mock.Random.natural(1,3),
    value:"",
    id: Mock.Random.guid(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users,tableOpTion };
