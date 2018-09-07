import React, {Component} from 'react'
// Load some exemplary plugins:
import slate from 'ory-editor-plugins-slate' // The rich text area plugin
import 'ory-editor-plugins-slate/lib/index.css' // Stylesheets for the rich text area plugin

// The spacer plugin
import spacer from 'ory-editor-plugins-spacer'
import 'ory-editor-plugins-spacer/lib/index.css'

// The image plugin
import  imagePlugin  from 'ory-editor-plugins-image'
import 'ory-editor-plugins-image/lib/index.css'

// The video plugin
import video from 'ory-editor-plugins-video'
import 'ory-editor-plugins-video/lib/index.css'

// The parallax plugin
import parallax from 'ory-editor-plugins-parallax-background'
import 'ory-editor-plugins-parallax-background/lib/index.css'


// The native handler plugin
import native from 'ory-editor-plugins-default-native'

// The divider plugin
import divider from 'ory-editor-plugins-divider'
import { HTMLRenderer } from 'ory-editor-renderer'
import getBlog from '../../service/apis/get-blog'
import {withRouter} from 'react-router-dom'

class HtmlRender extends Component {
    state = {
        errorMsg: null,
        contents: ''
    }
    callback = (data) => {
        if(data.status === 200){
            this.setState({
                errorMsg: '',
                contents: data.data
            })
        }else {
            this.setState({
                errorMsg: data['status']
            })
        }
    }  

    componentDidMount() {
        window.scrollTo(0, 0);
        const id = this.props.match.params.id
        if(id){
            getBlog(this.callback,id)
        }

        
    }

    render(){
        console.log()
        const plugins = {
            content: [slate(),spacer,imagePlugin,video,divider], // Define plugins for content cells. To import multiple plugins, use [slate(), image, spacer, divider]
            layout: [parallax({ defaultPlugin: slate() })], // Define plugins for layout cells
            native
          }
        if(this.state.contents.content){
            return(
            <div className="my-editor">
                <HTMLRenderer state={JSON.parse(this.state.contents.content)} plugins={plugins} />
            </div>
        )
        }else{
            return(
                <div>
                    Not Found
                </div>
            )
        }
        
    }
}

export default withRouter(HtmlRender)
