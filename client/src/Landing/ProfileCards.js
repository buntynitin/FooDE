import React from 'react'
import ProfileCard from './ProfileCard'
import {Grid, Container, Typography} from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
export default function ProfileCards() {
    return (
        <div>
            <Container style={{marginTop:"36px"}}>
            {/* <Divider style={{margin:"18px"}} /> */}
            <Typography variant="h4" marked="center" align="center" component="h2">
                Our Team      
          </Typography>
            <Grid container spacing={1} style={{background:"url('https://res.cloudinary.com/dez3yjolk/image/upload/v1607743523/samples/productCurvyLines_puecgu.png')"}}>
               <br></br>
                <Typography variant="body2" style={{color:"gray",padding:"18px"}}>
                In the era of tremendous competition, people exert themselves to seek the best. The purpose of this project is to prune the extra effort they put. And in order to accomplish the goal, we overcame all the struggles that came upon and completed the task. The credit completely goes to the professionalism and ever learning mindset of our proficient team members. We acknowledge.......
                </Typography>
                <Grid item md={3} sm={6} xs={12}>
                <ProfileCard
                name={"Nitin Chauhan"}
                email={"nitinkumar.c18@iiits.in"}
                bio={"Full-stack developer specialising in building large, scalable and user-friendly web apps"}
                image={"https://res.cloudinary.com/dez3yjolk/image/upload/c_thumb,w_200,g_face/v1607850783/samples/team-5_juszt4.png"}
                github={"https://github.com/buntynitin"}
                facebook={"https://www.facebook.com/nitin.chauhan.73744"}
                />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                <ProfileCard
                name={"Anunay Alok"}
                email={"anunay.a18@iiits.in"}
                bio={"Competative coder actively participating in contests, loves data-structure and algorithms"}
                image={"https://res.cloudinary.com/dez3yjolk/image/upload/c_thumb,w_200,g_face/v1607850781/samples/team-1_odmevb.png"}
                facebook={"https://www.facebook.com/anunay.alok.7"}
                github={"https://github.com/Anunay-alok"}
                />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                <ProfileCard 
                name={"Chandan Roy"}
                email={"chandankumar.r18@iiits.in"}
                bio={"Data scientist implemeting complex and effieient alogrithm also interested in CV "}
                image={"https://res.cloudinary.com/dez3yjolk/image/upload/c_thumb,w_200,g_face/v1607850781/samples/team-3_lfa4gl.png"}
                github={"https://github.com/chandan5362"}
                facebook={"https://www.facebook.com/chandan5362"}
                />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                <ProfileCard 
                name={"Ankit Kumar"}
                email={"ankit.k18@iiits.in"}
                bio={"A competative coder with special interest in Machine Learning and Cyber security"}
                image={"https://res.cloudinary.com/dez3yjolk/image/upload/c_thumb,w_200,g_face/v1607850783/samples/team-4_ofouve.png"}
                facebook={"https://www.facebook.com/people/Ankit-Kumar/100004930485502"}
                github={"https://github.com/zefferskioich"}
                />
                </Grid>

            </Grid>
            </Container>
           
        </div>
    )
}
