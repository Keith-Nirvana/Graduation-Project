import React from "react";
import styled from "styled-components";
import {PageHeader, Typography} from 'antd';
import qs from 'query-string';
import 'antd/dist/antd.css';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import userInfo from "../../stores/global";
import {message} from "antd/lib/index";
import axios from "axios/index";

const CarouselWrapper = styled.div`
  height: 70vh;
  display: flex;
  justify-content: start;
  padding: 0px 20px 20px 0px;
  align-items: start;
`;

const CarouselBody = styled.div`
  width: 720px;
  
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlyDiv = styled.div`
  display: flex;
`;


const WrapperDiv = styled.div`
  backgroundColor: white;
  width: 100%;
  height: 100%;
  padding: 20px 20px 20px 20px
`;

const {Title} = Typography;

class ViewChartsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      links: []
    }
  };

  componentDidMount() {
    let temp = qs.parse(this.props.location.search);

    let _this = this;
    axios.get('/project/view', {
      params: {
        username: userInfo.username,
        projectId: temp.projectId,
        projectName: temp.projectName
      }
    })
        .then(function (response) {
          let data = response.data;

          _this.setState({
            links: data.links
          });

          console.log(_this.state.links)
        })
        .catch(function (error) {
          message.warning('网络链接出错');
        });
  }

  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
    };
  };

  onChange = (a, b, c) => {
    console.log(a, b, c);
  };

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    const carouselItems = this.state.links.map((pic) => (
        <InnerWrapper key={pic}>
          <InnerWrapper>
            <img src={pic.urlLink} style={{height: '480px', width: '640px'}}/>
          </InnerWrapper>
        </InnerWrapper>
    ));

    return (
        <WrapperDiv>
          <div>
            <PageHeader title="分析结果查看"/>
          </div>

          <FlyDiv>
            <div style={{width: '55%'}}>
              <CarouselWrapper>
                <CarouselBody>
                  <Slider {...settings} style={{width: '720px', height: '520px', margin: 'auto'}}>
                    {/*<div>*/}
                      {/*<InnerWrapper>*/}
                        {/*<img src={"https://thesis-project.oss-cn-beijing.aliyuncs.com/commentRatebitcoin1.png"} style={{height: '480px', width: '640px'}}/>*/}
                      {/*</InnerWrapper>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                      {/*<InnerWrapper>*/}
                        {/*<img src={[require("../../assets/aveMCC-dogecoin.png")]}/>*/}
                      {/*</InnerWrapper>*/}
                    {/*</div>*/}
                    {carouselItems}
                  </Slider>


                  {/*<Carousel style={{width: '720px', height: '520px', margin: 'auto'}}*/}
                  {/*dots="true" afterChange={this.onChange}>*/}

                  {/*<div>*/}
                  {/*<InnerWrapper>*/}
                  {/*<img src={[require("../../assets/aveMCC-dogecoin.png")]}/>*/}
                  {/*</InnerWrapper>*/}
                  {/*</div>*/}

                  {/*<div>*/}
                  {/*<InnerWrapper>*/}
                  {/*<img src={[require("../../assets/aveMCC-dogecoin.png")]}/>*/}
                  {/*</InnerWrapper>*/}
                  {/*</div>*/}
                  {/*</Carousel>*/}
                </CarouselBody>
              </CarouselWrapper>
            </div>

            <div style={{width: '45%', marginTop: 150}}>
              <Title level={4}>图表说明</Title>
              <div style={{marginLeft: 20, lineHeight: '30px'}}>
                <ol>
                  <li> 图中右上角表示代表本图项目名-度量指标</li>
                  <li> 横轴按照版本编号递增</li>
                  <li> 纵轴代表指标值</li>
                </ol>
              </div>
            </div>

          </FlyDiv>
        </WrapperDiv>
    );
  }

}

export default ViewChartsPage;