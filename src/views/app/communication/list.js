import React, { Component, Fragment } from "react";
import {
  Row
} from "reactstrap";

import DataListView from "../../../containers/pages/DataListView";
import Pagination from "../../../containers/pages/Pagination";
import ContextMenuContainer from "../../../containers/pages/ContextMenuContainer";
import ListPageHeading from "../../../containers/pages/ListPageHeading";
import ImageListView from "../../../containers/pages/ImageListView";
import ListItem from "./listItem";
import ListItemAdvanced from "./listItemAdvanced";
import { withRouter } from "react-router-dom";
import Modal from '../../util/Modal'
import IntlMessages from "../../../helpers/IntlMessages";
import MediaControlCard from "./testCard";


function collect(props) {
  return { data: props.data };
}

class ImageListPages extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require('mousetrap');
    this.state = {
      displayMode: "list",
      showModal: false,

      selectedPageSize: 10,
      orderOptions: [
        { column: "title", label: "Product Name" },
        { column: "category", label: "Category" },
        { column: "status", label: "Status" }
      ],
      pageSizes: [10, 15, 20],

      categories: [
        { label: "Cakes", value: "Cakes", key: 0 },
        { label: "Cupcakes", value: "Cupcakes", key: 1 },
        { label: "Desserts", value: "Desserts", key: 2 }
      ],

      selectedOrderOption: { column: "title", label: "Product Name" },
      dropdownSplitOpen: false,
      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      toDelete: null,
      toPublish: null,
      toNotify: null
    };
  }


  toggle = (id) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  componentDidMount() {
    this.props.getList({ page: 1, size: 10, sort: this.props.selectedOrderOption['column'] })
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.props.getList({ name: this.state.search, title: this.state.search, sort: this.props.selectedOrderOption['column'] });
    }
    if (this.state.currentPage !== prevState.currentPage) {
      this.props.getList({ page: this.state.currentPage, size: this.state.selectedPageSize, sort: this.props.selectedOrderOption['column'] });
    }
    if (prevProps.toRefresh !== this.props.toRefresh && this.props.toRefresh) {
      this.props.getList({ page: this.state.currentPage, size: this.state.selectedPageSize, sort: this.props.selectedOrderOption['column'] });
    }
    if (prevProps.selectedOrderOption !== this.props.selectedOrderOption) {
      this.props.getList({ page: this.state.currentPage, size: this.state.selectedPageSize, sort: this.props.selectedOrderOption['column'] });
    }
    if (prevState.selectedPageSize !== this.state.selectedPageSize) {
      this.props.getList({ page: this.state.currentPage, size: this.state.selectedPageSize, sort: this.props.selectedOrderOption['column'] });
    }
  }
  handleDelete = (id) => {
    this.setState({ toDelete: id, toPublish: null, toNotify: null })
    this.toggle(id)
  }
  handlePublish = (id) => {
    this.setState({ toPublish: id, toDelete: null, toNotify: null })
    this.toggle(id)
  }
  handleNotify = (id) => {
    this.setState({ toNotify: id, toDelete: null, toPublish: null })
    this.toggle(id)
  }
  handleEdit = (id) => {
    this.props.history.push(this.props.location.pathname + '/edit?id=' + id)
  }

  toggleModal = () => {
    this.props.history.push(this.props.location.pathname + '/add')
  };

  handleAction = () => {
    if (this.state.toDelete) {
      return this.props.delete(this.state.toDelete);
    } else {
      if (this.state.toNotify) {
        return this.props.notify(this.state.toNotify)
      } else {
        if (this.state.toPublish) {
          return this.props.publish(this.state.toPublish);
        }
      }
    }
  }
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

  changePageSize = size => {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
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
            selectedOrderOption={this.props.selectedOrderOption}
            match={match}
            startIndex={startIndex}
            endIndex={endIndex}
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            itemsLength={items ? items.length : 0}
            onSearchKey={this.onSearchKey}
            orderOptions={this.props.orderOptions}
            pageSizes={pageSizes}
            toggleModal={this.toggleModal}
            changeOrderBy={this.props.changeOrderBy}
            changePageSize={this.changePageSize}
          />
          <Row>
            <Modal isOpen={this.state.showModal} close={this.toggle} action={this.handleAction} />
            {this.props.comm_list && !this.props.loading && this.props.comm_list.map(item => {
              return (
                <>{this.props.advanced ?
                  <MediaControlCard
                    key={item.id}
                    item={item}
                    collect={collect}
                    location={this.props.location}
                    handleDelete={() => this.handleDelete(item.id)}
                    handleEdit={() => this.handleEdit(item.id)}
                    handlePublish={() => this.handlePublish(item.id)}
                    handleNotify={() => this.handleNotify(item.id)}
                  />
                  :
                  <ListItem
                    notification={this.props.notification}
                    key={item.id}
                    item={item}
                    collect={collect}
                    location={this.props.location}
                    handleDelete={() => this.handleDelete(item.id)}
                    handleEdit={() => this.handleEdit(item.id)}
                    handlePublish={() => this.handlePublish(item.id)}
                    handleNotify={() => this.handleNotify(item.id)}
                  />

                }
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

export default withRouter(React.memo(ImageListPages))
