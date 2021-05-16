import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container,
  Typography,
  Card,
  CardContent,
} from '@material-ui/core';
import MapDetail from "../../components/timeletter/MapDetail"
import bgImage from 'pages/images/sky2.jpg'
import ReactPlayer from 'react-player'
import sampleVideo1 from 'static/videos/sampleVideo1.mp4'
import sampleVideo2 from 'static/videos/sampleVideo2.mp4'
import MapIcon from '@material-ui/icons/Map'
import axios from 'axios';
import { BASE_URL, TOKEN } from 'constants/index.js'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${bgImage})`,
    paddingTop: '20px',
    paddingBottom: '80px',
  },
  title: {
    marginTop: '40px',
    color: 'white'
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e8eaf6',
    padding: theme.spacing(0, 2),
    paddingBottom: '20px',
    borderRadius:"10px"
  },
  video: {
    borderRadius:"10px",
    width: '100%',
    height: '250px',
  }
}))

// 함수형 컴포넌트
const LetterDetail = () => {
  let { code } = useParams()
  // console.log(code)
  const classes = useStyles()


  const [name, setName] = useState('안세익')
  const [letter, setLetter] = useState(
    {
      letterId: 1,
      userId: 1,
      title: 'title1',
      message: 'message1',
      file: '',
      private: true,
      openDate: '2021-05-14',
      latitude: 33.450705,
      longitude: 126.570677,
      open: true,
      letterCode: '12345qwert'
    },
  )

  useEffect(() => {
    // letterCode를 파라미터로 letter정보를 받아 오는 axios 요청 필요
    axios.get(BASE_URL + `letter/retrieve/${code}`)
    .then(res => {
      console.log(res)
      for (const [key, value] of Object.entries(res.data)) {
        setName(key)
        setLetter(value)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  // const letter = {
  //   letterId: 1,
  //   userId: 1,
  //   userName: '안세익',
  //   title: 'title1',
  //   message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellat perferendis dolorum molestiae harum nostrum, minima atque officia corrupti iusto tempora modi eaque',
  //   file: {sampleVideo1},
  //   private: true,
  //   openDate: '2021-05-14',
  //   latitude: 33.450705,
  //   longitude: 126.570677,
  //   open: true,
  //   letterCode: '12345qwert'
  // }

  const [mapOpen, setMapOpen] = useState(false)

  const handleMap = () => {
    setMapOpen(!mapOpen)
  }

  return (
    <Container className={classes.container} maxWidth="xs">
      <Typography className={classes.title} variant="h6">레터 상세조회</Typography>
      <div className={classes.paper}>
        {/* 영상재생 */}
        <div className={classes.video}>
          <ReactPlayer
            // ******** 비디오 url 수정 ************
            // url={sampleVideo2}
            url='/videos/sampleVideo1.mp4'
            width='100%'
            height='100%'
            // playing
            controls
          />
        </div>
        <Typography variant="subtitle1">- 이름 : {letter.title}</Typography>
        <Typography variant="subtitle1">- 보낸 사람 : {name}</Typography>
        {/* {letter.isOpen ? content : null} */}
        <Typography variant="subtitle1">- 내용</Typography>
        <Card>
          <CardContent>
            <Typography>{letter.message}</Typography> 
          </CardContent>
        </Card>
        <Typography variant="subtitle1">- 오픈날짜 : {letter.openDate}</Typography>
        <Typography variant="subtitle1" style={{display: 'flex', alignItems: 'center'}}><span>- 추억장소</span><MapIcon onClick={handleMap} style={{marginLeft: '5px'}} /></Typography>
        {mapOpen === true ? <MapDetail lat={letter.latitude} lng={letter.longitude} /> : null}
        
      </div>
    </Container>
  )
}

export default LetterDetail
