import React from 'react'
import './Home.css'
function ProfileCard(props) {
    return (
        <div style={{marginTop:"92px"}}>
            <aside className="profile-card">
  <div className="mask-shadow" />
  <header>
    {/* here’s the avatar */}
    <a>
      <img src={props.image} />
    </a>
    {/* the username */}
    <h1>{props.name}</h1>
    {/* and role or location */}
    <h2>{props.email}</h2>
  </header>
  {/* bit of a bio; who are you? */}
  <div className="profile-bio">
    <p>{props.bio}</p>
  </div>
  {/* some social links to show off */}
  <ul className="profile-social-links">
    {/* twitter - el clásico  */}
    <li>
      <a href={props.github}>
        <img src="/github.svg" />
      </a>
    </li>
    {/* envato – use this one to link to your marketplace profile */}
    <li>
      <a href={props.facebook}>
        <img src="/facebook.svg" />
      </a>
    </li>
  </ul>
</aside>
            
        </div>
    )
}

export default ProfileCard
