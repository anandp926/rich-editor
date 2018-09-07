import React, {Component} from 'react'

// The editor core
import Editor, { Editable, createEmptyState } from 'ory-editor-core'
import 'ory-editor-core/lib/index.css' // we also want to load the stylesheets

// Require our ui components (optional). You can implement and use your own ui too!
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'
import 'ory-editor-ui/lib/index.css'

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

// Renders json state to html, can be used on server and client side
require('react-tap-event-plugin')() // react-tap-event-plugin is required by material-ui which is used by ory-editor-ui so we need to call it here

// Define which plugins we want to use. We only have slate and parallax available, so load those.


class OryEditor extends Component {

  saveToDatabase = (state) => {
    localStorage.setItem('user',JSON.stringify(state))
    console.log(state)
  }

  render() {
    const plugins = {
      content: [slate(),spacer,imagePlugin,video,divider], // Define plugins for content cells. To import multiple plugins, use [slate(), image, spacer, divider]
      layout: [parallax({ defaultPlugin: slate() })], // Define plugins for layout cells
      native
    }
    
    // Creates an empty editable
    const content = JSON.parse(localStorage.getItem('user')) || createEmptyState()
    
    // Instantiate the editor
    const editor = new Editor({
        defaultPlugin: slate(),
        plugins: plugins,
        editables: [content],
    })
    return (
      <div>
        <button onClick={() => this.saveToDatabase(this.editorState)}>Save</button>
        {/* Content area */}
        <Editable editor={editor} id={content.id} onChange={state => (this.editorState = state)}/>

        {/*  Default user interface  */}
        <Trash editor={editor}/>
        <DisplayModeToggle editor={editor}/>
        <Toolbar editor={editor}/>
      </div>
    );
  }
}

export default OryEditor;
