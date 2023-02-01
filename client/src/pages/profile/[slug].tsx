import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { IParams, IUser, RootStore } from '../../utils/TypeScript'
import { useSelector } from 'react-redux'
import OtherInfo from '../../components/profile/OtherInfo'
import UserInfo from '../../components/profile/UserInfo'
import UserBlogs from '../../components/profile/UserBlogs'
import Follow from '../../components/profile/Follow'
import { RiArrowGoBackLine } from 'react-icons/ri'

const Profile = () => {
  const { slug }: IParams = useParams()
  const { auth } = useSelector((state: RootStore) => state)
  const [follow, setFollow] = useState([] as IUser[])
  const [following, setFollowing] = useState(true)

  return (
    <div className="user_profile">
      <div>
        {auth.user?._id === slug ? (
          <UserInfo setFollow={setFollow} setFollowing={setFollowing} />
        ) : (
          slug && <OtherInfo id={slug} />
        )}
      </div>
      <div className="user_blogs">
        {follow.length && auth.user?._id === slug ? (
          <>
            {following ? <h3>Followings</h3> : <h3>Followers</h3>}
            <div
              className="go_back"
              onClick={() => setFollow([])}
              onKeyUp={() => setFollow([])}
              role="button"
              tabIndex={0}
            >
              <RiArrowGoBackLine />
            </div>
            <Follow follow={follow} />
          </>
        ) : (
          <>
            {' '}
            <h3>Blogs</h3>
            <UserBlogs />
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
