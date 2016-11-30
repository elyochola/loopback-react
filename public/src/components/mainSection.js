import React, {Component, PropTypes} from 'react';
import ReactPlayer from 'react-player';
import ReactDOM from 'react-dom';


export class MainSection extends Component {



    render() {
        return (
            <div className=" row text-center">
              <h1 className="white-title"> WELCOME ON STRONGLOOP REACT FOR USERS </h1>
         

            

              <video ref="video" autoPlay loop>
                <source src="https://player.vimeo.com/external/158148793.hd.mp4?s=8e8741dbee251d5c35a759718d4b0976fbf38b6f&profile_id=119&oauth2_token_id=57447761" type="video/mp4"/>
              </video> 
            </div>


        );
    }


 

}