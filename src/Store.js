import React from 'react'
export const userData = [{
  name: "laila",
  birthday: "19-2-2012",
  country: "Israel",
  profile: "https://post.healthline.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg",
  id: 1
}, {
  name: "arthur",
  birthday: "1-6-2012",
  country: "Brazil",
  profile: "https://shawglobalnews.files.wordpress.com/2019/10/puppy.jpg",
  id: 2
}, {
  name: "alexandra",
  birthday: "3-2-1992",
  country: "France",
  profile: "https://www.sciencealert.com/images/2020-03/processed/010-pomeranian_1024.jpg",
  id: 3
}, {
  name: "bob",
  birthday: "11-4-1980",
  country: "France",
  profile: "https://i.pinimg.com/originals/4e/65/fe/4e65fe00b5ea08dde82d6c48c9c55fa4.jpg",
  id: 4
}, {
  name: "johnny",
  birthday: "24-5-2001",
  country: "Germany",
  profile: "https://www.thesun.co.uk/wp-content/uploads/2017/10/gettyimages-590486672-e1508512743796.jpg",
  id: 5
}];
const DefaultUserData = React.createContext();
export default DefaultUserData