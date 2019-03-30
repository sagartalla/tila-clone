import React,{Component} from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash'
import { mergeCss } from '../../../utils/cssUtil';

const styles = mergeCss('components/common/Pagination/pagination');
const LEFT_PAGE = 'LEFT_PAGE'
const RIGHT_PAGE = 'RIGHT_PAGE'

export default class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state={
      currentPage:this.props.currentPage
    }

    this.handleMoveRight = this.handleMoveRight.bind(this)
    this.handleMoveLeft = this.handleMoveLeft.bind(this)
    this.goToPage = this.goToPage.bind(this)
  }

  handleMoveLeft(e) {
    e.preventDefault()
    this.goToPage(this.state.currentPage - this.props.pageNeighbours * 2 - 1)
  }
  handleMoveRight(e) {
    e.preventDefault()
    this.goToPage(this.state.currentPage + this.props.pageNeighbours * 2 + 1)
  }
  handleClick = (page) => (e) => {
    e.preventDefault()
    this.goToPage(page)
  }
  goToPage(page) {
    const { totalSize } = this.props;
    let currentPage = Math.max(0,Math.min(totalSize, page))
    this.setState({ currentPage },() => this.props.onPageChanged(currentPage))
  }
  range = (from,to,step=1) => {
    let i = from
    let range = []
    while(i<= to) {
      range.push(i)
      i += step
    }

    return range;
  }
  fetchPageNumbers() {
    const {totalSize,pageNeighbours} = this.props;
    const { currentPage } = this.state;
    let totalNumbers = (pageNeighbours * 2) + 3
    let totalBlocks = totalNumbers + 2;
    if(totalSize > totalBlocks) {
      let beforeLastPage = totalSize - 1
      let startPage = Math.max(2,currentPage - pageNeighbours)
      let endPage = Math.min(totalSize - 1, currentPage + pageNeighbours)
      let pages = this.range(startPage,endPage)

      let leftSpill = startPage > 2;
      let rightSpill = endPage < beforeLastPage
      let offSet = totalNumbers - pages.length - 1

      switch (true) {
        case (leftSpill && !rightSpill): {
          let extraPages = this.range(startPage - offSet, startPage - 1)
          pages = [LEFT_PAGE,...extraPages,...pages]
          break;
        }

        case (rightSpill && !leftSpill):{
          let extraPages = this.range(endPage + 1, endPage + offSet)
          pages = [...pages,...extraPages,RIGHT_PAGE]
          break;
        }

        case (rightSpill && leftSpill):

        default: {
          pages = [LEFT_PAGE,...pages,RIGHT_PAGE]
        }

      }

      return [0,...pages,totalSize]
    }

    return this.range(0,totalSize)
  }
  render(){
    debugger
    if(!this.props.totalSize) return null;

    let pages = this.fetchPageNumbers()
    return (
      <div className={styles['pagination-prt']}>
        <>
          <ul className={`${styles['pagination-list']} ${styles['pl-0']} ${styles['flex']}`}>
            {
              pages.map((el,index) => {
                if(el === 'LEFT_PAGE') {
                  return (
                    <li key={index} >
                    <a
                      href="#"
                      aria-label="Previous"
                      onClick={this.handleMoveLeft}
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  )
                }

                if(el === 'RIGHT_PAGE'){
                  return (
                    <li key={index} className="page-item">
                      <a
                        className="page-link"
                        href="#"
                        aria-label="Next"
                        onClick={this.handleMoveRight}
                      >
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  )
                }

                return (
                  <li
                  key={index}
                  >
                  <a
                    href="#"
                    onClick={this.handleClick(el)}
                  >
                    {el}
                  </a>
                </li>
                )

              })
            }
          </ul>
        </>
      </div>
    )
  }
}

Pagination.propTypes = {
  totalSize:PropTypes.number.isRequired,
  pageNeighbours:PropTypes.number,
  onPageChanged:PropTypes.func,
  currentPage:PropTypes.number
}
Pagination.defaultProps = {
  pageNeighbours:1,
  currentPage:0
}
