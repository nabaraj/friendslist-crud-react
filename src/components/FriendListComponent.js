import React, { useEffect } from 'react';

export default function FriendListComponent() {
  const pagelistCount = 4;
  const modalDefaultCofig = {
    show: false,
    title: '',
    content: '',
    footer: '',
    onOk: () => {},
    onCancel: () => {},
  };
  const [friendList, setFriendList] = React.useState([
    {
      firstname: 'Veronica',
      lastname: 'May',
      id: '6186810140ed32b2ba578c1c',
      favorite: false,
    },
    {
      firstname: 'Mavis',
      lastname: 'Ayala',
      id: '6186810182937f0669e80074',
      favorite: false,
    },
    {
      firstname: 'Lenora',
      lastname: 'Bailey',
      id: '61868101294bb9516ae4309c',
      favorite: false,
    },
    {
      firstname: 'Isabella',
      lastname: 'Reilly',
      id: '61868101fa80b87dd0c552ef',
      favorite: true,
    },
    {
      firstname: 'Velasquez',
      lastname: 'Shelton',
      id: '61868101d5887c24842029b1',
      favorite: true,
    },
    {
      firstname: 'Desiree',
      lastname: 'Johnston',
      id: '618681010dff45dd0ba2a7e5',
      favorite: true,
    },
    {
      firstname: 'Berta',
      lastname: 'Maynard',
      id: '61868101a6b7cfbd07214e04',
      favorite: false,
    },
    {
      firstname: 'Holder',
      lastname: 'Hayes',
      id: '61868101c0d0951bb13d7e70',
      favorite: true,
    },
    {
      firstname: 'Kara',
      lastname: 'Sims',
      id: '618681011be962a2813909e7',
      favorite: false,
    },
    {
      firstname: 'Carlene',
      lastname: 'Huffman',
      id: '61868101dc487882b7330508',
      favorite: true,
    },
    {
      firstname: 'Barron',
      lastname: 'Rice',
      id: '61868101e85ccf22545867e5',
      favorite: false,
    },
    {
      firstname: 'Cunningham',
      lastname: 'Snyder',
      id: '61868101ee4a88f130013c45',
      favorite: false,
    },
    {
      firstname: 'Olsen',
      lastname: 'Lopez',
      id: '6186810160db9f44e9b1c5ba',
      favorite: false,
    },
    {
      firstname: 'Nina',
      lastname: 'Camacho',
      id: '618681011d95d0793bcfc1d8',
      favorite: false,
    },
    {
      firstname: 'Nancy',
      lastname: 'Lawrence',
      id: '61868101c9960674a2794e5b',
      favorite: false,
    },
    {
      firstname: 'Odom',
      lastname: 'Cobb',
      id: '618681012417f1b3ef168e4f',
      favorite: true,
    },
    {
      firstname: 'Kimberley',
      lastname: 'Barrera',
      id: '618681010993ab233dd6b355',
      favorite: false,
    },
  ]);
  const [filteredList, setFilteredList] = React.useState([]);
  const [sortBy, setSortBy] = React.useState('asc');
  const [pageNumber, setPageNumber] = React.useState(1);
  const [friendName, setFriendName] = React.useState('');
  const [pageIndex, setPageIndex] = React.useState({
    startIndex: 0,
    endIndex: pagelistCount,
  });
  const [modalConfig, setModalConfig] = React.useState(modalDefaultCofig);

  useEffect(() => {
    // console.log(sortBy);
    filterList();
  }, [friendName]);

  //filter filteredList by text input
  const filterList = (friendListProps) => {
    let value = friendName;
    let friends = friendListProps || friendList;
    if (value === '') {
      setFilteredList(friendList);
      return;
    }
    const filteredList = friends.filter((friend) => {
      return (
        friend.firstname.toLowerCase().includes(value) ||
        friend.lastname.toLowerCase().includes(value)
      );
    });
    sortByFavorite();
    setFilteredList(filteredList);
  };

  const previousPage = () => {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber(pageNumber - 1);
    setPageIndex({
      startIndex: pageIndex.startIndex - pagelistCount,
      endIndex: pageIndex.endIndex - pagelistCount,
    });
  };
  const nextPage = () => {
    if (pageNumber === Math.ceil(filteredList.length / pagelistCount)) {
      return;
    }
    setPageNumber(pageNumber + 1);

    setPageIndex({
      startIndex: pageIndex.startIndex + pagelistCount,
      endIndex: pageIndex.endIndex + pagelistCount,
    });
  };
  const setPage = (i) => {
    let startIndex = i * pagelistCount - pagelistCount;
    setPageNumber(i);
    setPageIndex({ startIndex, endIndex: startIndex + pagelistCount });
  };
  // pagination logic
  const generatePagination = () => {
    const pageCount = Math.ceil(filteredList.length / pagelistCount);
    const pageList = [];
    for (let i = 1; i <= pageCount; i++) {
      pageList.push(
        <li className={`page-item`} key={i}>
          <button
            className={`btn rounded-0 ${
              pageNumber === i ? 'btn-dark' : 'btn-outline-dark'
            } `}
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    pageList.push(
      <li className="page-item" key={pageCount + 1}>
        <button
          className="btn btn-outline-dark rounded-left-0"
          onClick={nextPage}
        >
          &raquo;
        </button>
      </li>
    );
    pageList.unshift(
      <li className="page-item" key={pageCount + 2}>
        <button
          className="btn btn-outline-dark  rounded-right-0"
          onClick={previousPage}
        >
          &laquo;
        </button>
      </li>
    );

    return pageList;
  };

  //sort filtered list by favorite or not
  const sortByFavorite = () => {
    if (sortBy === 'asc') {
      setSortBy('desc');
    } else {
      setSortBy('asc');
    }
    filteredList.sort((a, b) => {
      if (sortBy === 'asc') {
        return b.favorite - a.favorite;
      } else {
        return a.favorite - b.favorite;
      }
    });
    setFilteredList(filteredList);
  };

  //generate random id
  const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  //add friendName to friendList if not already in list
  const handleSubmit = (e) => {
    if (filteredList.length === 0 && e.keyCode === 13) {
      e.preventDefault();
      if (friendName === '') {
        return;
      }
      let newFriend = {
        firstname: friendName,
        lastname: '',
        id: generateId(),
        favorite: false,
      };
      setFriendName('');
      setFriendList([...friendList, newFriend]);
      console.log(friendList);
      filterList([...friendList, newFriend]);
    }
  };

  //set favorite to true or false
  const setFavorite = (id) => {
    let newList = [...friendList];
    let index = newList.findIndex((friend) => friend.id === id);
    newList[index].favorite = !newList[index].favorite;
    setFriendList(newList);
    setFilteredList(newList);
  };

  //delete confirmation modal
  const deleteConfirmation = (id) => {
    let findFriend = filteredList.find((friend) => friend.id === id);

    setModalConfig({
      show: true,
      title: 'Confirm Delete',
      content: (
        <p>
          Are you sure you want to remove {findFriend.firstname} from friend
          list?
        </p>
      ),
      footer: '',
      onOk: () => {
        setModalConfig(modalDefaultCofig);
        deleteFriend(id);
      },
      onCancel: () => {
        setModalConfig(modalDefaultCofig);
      },
    });
  };
  //delete friend from list
  const deleteFriend = (id) => {
    let newList = [...friendList];
    let index = newList.findIndex((friend) => friend.id === id);
    newList.splice(index, 1);
    setFriendList(newList);
    setFilteredList(newList);
  };

  return (
    <div className="container">
      <div
        className={`modal fade ${modalConfig.show ? 'show' : ''}`}
        tabIndex="-1"
        aria-hidden="true"
        style={{ display: modalConfig.show ? 'block' : '' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {modalConfig.title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setModalConfig(modalDefaultCofig)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{modalConfig.content}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={modalConfig.onOk}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={modalConfig.onCancel}
              >
                Nevermind
              </button>
            </div>
          </div>
        </div>
      </div>
      <h3>Friends List</h3>
      <form>
        <div className="form-group d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your friend name"
            aria-label="Enter your friend name"
            value={friendName}
            onChange={(e) => {
              setFriendName(e.target.value);
            }}
            onKeyDown={(e) => handleSubmit(e)}
          />
        </div>
      </form>
      <div className="d-flex justify-content-end pb-3">
        <button
          className="btn btn-outline-dark"
          onClick={() => {
            sortByFavorite();
          }}
        >
          Sort By
          {sortBy === 'asc' ? (
            <i className="bi bi-arrow-down-short"></i>
          ) : (
            <i className="bi bi-arrow-up-short"></i>
          )}
        </button>
      </div>
      {filteredList.length > 0 ? (
        <ul id="friendList" className="list-group">
          {filteredList
            .slice(pageIndex.startIndex, pageIndex.endIndex)
            .map((item, index) => (
              <li className="list-group-item" key={item.id}>
                <div className="row justify-content-between align-items-center">
                  <div className="col-12 col-sm-6">
                    <h4>
                      {item.firstname} {item.lastname}
                    </h4>
                    <span>Is your friend</span>
                  </div>
                  <div className="col-12 col-sm-6 pt-3 pt-xs-0 text-left text-sm-right">
                    <button
                      type="button"
                      onClick={() => {
                        setFavorite(item.id);
                      }}
                      className={`btn btn-sm mr-3 ${
                        item.favorite ? 'btn-dark' : 'btn-outline-dark'
                      }`}
                    >
                      <i className="bi bi-star"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        // deleteFriend(item.id);
                        deleteConfirmation(item.id);
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <h6 className="text-center">
          Press enter to add friend in the friendlist
        </h6>
      )}
      {filteredList.length > 4 && (
        <nav aria-label="Page navigation example" className="pt-4">
          <ul className="pagination pagination-sm">{generatePagination()}</ul>
        </nav>
      )}
      {modalConfig.show && <div className={`modal-backdrop fade show`}></div>}
    </div>
  );
}
