import React,{Component} from 'react';
import { mergeCss } from '../../../utils/cssUtil';
import { languageDefinations } from '../../../utils/lang/';
import SVGComponent from '../../common/SVGComponet';

const styles = mergeCss('components/common/DragDropUpload/dragDrop');
const { DRAG_DROP } = languageDefinations();

export default class DragDropUpload extends Component {
    constructor(props) {
        super(props);
        this.droppableArea = null;
        this.handleChange = this.handleChange.bind(this)
        this.handleDrop = this.handleDrop.bind(this)
        this.setRef = element => {
            this.droppableArea = element
        }
    }
    componentDidMount() {
        ['dragenter','dragover','dragleave','drop'].forEach(eventname => {
            this.droppableArea.addEventListener(eventname,this.preventDefaults,false);
            document.body.addEventListener(eventname,this.preventDefaults,false)
        })
        this.droppableArea.addEventListener('drop',this.handleDrop,false)
    }
    componentWillUnmount() {
        ['dragenter','dragover','dragleave','drop'].forEach(eventname => {
            this.droppableArea.removeEventListener(eventname,this.preventDefaults,false);
            document.body.removeEventListener(eventname,this.preventDefaults,false)
        })
        this.droppableArea.removeEventListener('drop',this.handleDrop,false)
    }
    handleDrop(e) {
        let uplaodObj = {
            target:e.dataTransfer
        }
        this.handleChange(uplaodObj)
    }
    handleChange(e) {
        let dt = e.target.files[0];
        this.props.uploadCallback(dt)
    }
    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    render() {
        return (
            <div className={`${styles['upload']}`} ref={this.setRef}>
                <form>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={this.handleChange}
                        onDrop={this.handleDrop}
                    />
                    <div className={`${styles['dragdropicon']}`}>
                     <SVGComponent src="icons/dragdrop" className={`${styles['dragdropicon']}`} />
                    </div>
                    <p> {DRAG_DROP.DRAG_AND_DROP}</p>
                </form>
            </div>
        )
    }
}
