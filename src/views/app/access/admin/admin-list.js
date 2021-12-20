import React, { Component, Fragment } from "react";
import {
  Row
} from "reactstrap";
import { connect } from "react-redux";

import { servicePath } from "../../../../constants/defaultValues";
import { getAdminList, deleteUser } from '../../../../redux/access/actions'

import DataListView from "../../../../containers/pages/DataListView";
import Pagination from "../../../../containers/pages/Pagination";
import ContextMenuContainer from "../../../../containers/pages/ContextMenuContainer";
import ListPageHeading from "../../../../containers/pages/ListPageHeading";
import ImageListView from "../../../../containers/pages/ImageListView";
import ThumbListView from "../../../../containers/pages/ThumbListView";
import AddNewModal from "../../../../containers/pages/AddNewModal";
import { Role } from './constant'
import { withRouter } from "react-router-dom";
import Modal from '../../../util/Modal'
import IntlMessages from "../../../../helpers/IntlMessages";


function collect(props) {
  return { data: props.data };
}
const apiUrl = servicePath + "/cakes/paging";

class ImageListPages extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require('mousetrap');
    this.state = {
      displayMode: "list",
      showModal: false,

      selectedPageSize: 10,
      orderOptions: [
        { column: "name", label: "Nom" },
        { column: "lastModifiedDate", label: "Date de création" },
        { column: "activated", label: "Status" }
      ],
      pageSizes: [10, 15, 20],

      categories: [
        { label: "Cakes", value: "Cakes", key: 0 },
        { label: "Cupcakes", value: "Cupcakes", key: 1 },
        { label: "Desserts", value: "Desserts", key: 2 }
      ],

      selectedOrderOption: { column: "name", label: "Nom" },
      dropdownSplitOpen: false,
      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      toDelete: null
    };
  }


  toggle = (id) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  componentDidMount() {
    if (this.props.user) {
      this.props.getAdminList({ ...Role.user, sort: this.state.selectedOrderOption['column'] });
    } else {
      if (this.props.editor) {
        this.props.getAdminList({ ...Role.editor, sort: this.state.selectedOrderOption['column'] });
      } else {
        this.props.getAdminList({ ...Role.admin, sort: this.state.selectedOrderOption['column'] });
      }
    }
  }

  setRole = () => {
    if (this.props.user) {
      return Role.user
    }
    if (this.props.editor) {
      return Role.editor
    }
    return Role.admin
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.props.getAdminList({ ...this.setRole(), name: this.state.search, sort: this.state.selectedOrderOption['column'] });
    }
    if (this.state.currentPage !== prevState.currentPage) {
      this.props.getAdminList({ ...this.setRole(), page: this.state.currentPage, size: this.state.selectedPageSize, sort: this.state.selectedOrderOption['column'] });
    }
    if (this.state.selectedOrderOption !== prevState.selectedOrderOption) {
      this.props.getAdminList({ ...this.setRole(), page: this.state.currentPage, size: this.state.selectedPageSize, sort: this.state.selectedOrderOption['column'] });
    }
    if (this.state.selectedPageSize !== prevState.selectedPageSize) {
      this.props.getAdminList({ ...this.setRole(), page: this.state.currentPage, size: this.state.selectedPageSize, sort: this.state.selectedOrderOption['column'] });
    }
  }
  handleDelete = (id) => {
    this.setState({ toDelete: id })
    this.toggle(id)
  }



  handleEdit = (id) => {
    this.props.history.push(this.props.location.pathname + '/edit?user_id=' + id)
  }


  handleAction = () => {
    if (this.state.toDelete) {
      return this.props.delete(this.state.toDelete);
    }
  }

  toggleModal = () => {
    this.props.history.push(this.props.location.pathname + '/add')
  };

  changeDisplayMode = mode => {
    this.setState({
      displayMode: mode
    });
    return false;
  };
  onChangePage = page => {
    this.setState(
      {
        currentPage: page
      }
    );
  };

  onSearchKey = e => {
    this.setState(
      {
        search: e.target.value.toLowerCase()
      }
    );
  };


  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }


  onContextMenuClick = (e, data, target) => {
  };

  onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!this.state.selectedItems.includes(clickedProductId)) {
      this.setState({
        selectedItems: [clickedProductId]
      });
    }

    return true;
  };

  changeOrderBy = (column) => {
    this.setState({
      selectedOrderOption: this.findObjectByColumn(column)
    })
  }

  changePageSize = size => {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      }
    );
  };

  findObjectByColumn = (column) => {
    return this.state.orderOptions.find(item => item.column === column)
  }



  render() {
    const {
      currentPage,
      items,
      displayMode,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      selectedItems,
      orderOptions,
      pageSizes,
    } = this.state;
    const { match } = this.props;
    const startIndex = (currentPage - 1) * selectedPageSize;
    const endIndex = currentPage * selectedPageSize;

    return (
      <Fragment>
        <div className="disable-text-selection">
          <ListPageHeading
            heading={this.props.heading}
            displayMode={displayMode}
            selectedPageSize={selectedPageSize}
            totalItemCount={this.props.totalItem}
            selectedOrderOption={selectedOrderOption}
            match={match}
            startIndex={startIndex}
            endIndex={endIndex}
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            itemsLength={items ? items.length : 0}
            onSearchKey={this.onSearchKey}
            orderOptions={orderOptions}
            pageSizes={pageSizes}
            toggleModal={this.toggleModal}
            changeOrderBy={this.changeOrderBy}
            changePageSize={this.changePageSize}
          />
          <Row>
            <Modal isOpen={this.state.showModal} close={this.toggle} action={this.handleAction} />
            {this.props.list_admin && !this.props.isLoading && this.props.list_admin.map(admin => {
              return (
                <>
                  <ThumbListView
                    key={admin.id}
                    item={admin}
                    collect={collect}
                    location={this.props.location}
                    handleDelete={() => this.handleDelete(admin.login)}
                    handleEdit={() => this.handleEdit(admin.id)}
                  />
                </>
              );

            })}{" "}
            <Pagination
              currentPage={this.state.currentPage}
              totalPage={Math.trunc(this.props.totalItem / this.state.selectedPageSize + 1)}
              onChangePage={i => this.onChangePage(i)}
            />
            <ContextMenuContainer
              onContextMenuClick={this.onContextMenuClick}
              onContextMenu={this.onContextMenu}
            />
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    list_admin: state.access.list_admin && state.access.list_admin['data'],
    isLoading: state.access['loading'],
    totalItem: state.access.list_admin && state.access.list_admin.headers['x-total-count'],
    toRefresh: state.access['refresh']
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAdminList: params => dispatch(getAdminList(params)),
    deleteUser: id => dispatch(deleteUser(id))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageListPages));
