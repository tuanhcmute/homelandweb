/**
 *
 * Profile
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { DataGrid } from '@mui/x-data-grid';

import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import localStore from 'local-storage';
import { useParams, NavLink } from 'react-router-dom';
import moment from 'moment';
import Modal from 'react-modal';
import { Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Money from '../App/format';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';
import {
  changeStoreData,
  getPayDepositList,
  approvePendingPayDeposit,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectPayDepositList from './selectors';
import './style.scss';
import { urlLink } from '../../helper/route';

export function ManagerAcceptMonthlyHost(props) {
  useInjectReducer({ key: 'pendingAcceptDepositList', reducer });
  useInjectSaga({ key: 'pendingAcceptDepositList', saga });

  const currentUser = localStore.get('user') || {};
  const [idTransaction, setIdTransaction] = useState('');
  const [status, setStatus] = useState('');
  const { role = [] } = currentUser;
  const { id } = useParams();
  const {
    pendingAcceptDepositList = [],
    showWarningapprove,
    showSuccessapprove,
    action = 0,
  } = props.pendingAcceptDepositList;

  const getStatus = item => {
    if (item.status === 'waiting') return 'Đang chờ duyệt';
    if (item.status === 'faild') return 'Thất bại';
    if (item.status === 'success') return 'Thành công';
    if (item.status === 'cancel') return 'Đã hủy';
    return 'N/A';
  };

  useEffect(() => {
    props.getPayDepositList(id);
  }, [action]);

  const transformedData = useMemo(() => {
    if (pendingAcceptDepositList.length !== 0) {
      return pendingAcceptDepositList.map((item, index) => ({
        key: index + 1, // STT
        nameUser: `${item.user.lastName} ${item.user.firstName}`, // Người thuê
        phone: `${item.user.phoneNumber.countryCode}${
          item.user.phoneNumber.number
        }`, // Số điện thoại
        roomName: item.room.name ? item.room.name : 'N/A', // Phòng
        amount: `${Money(parseInt(item.amount, 10))} VNĐ`, // Số tiền cọc
        description: item.description,
        keyPayment: item.keyPayment,
        status: getStatus(item),
        time: moment(new Date(item.createdAt)).format('DD-MM-YYYY'),
        payment_Method:
          item.paymentMethod === 'cash' ? 'Tiền mặt' : 'Ngân hàng',
        file: item.file,
        _id: item._id,
        backId: item.user.backId ? item.user.backId : '',
        frontId: item.user.frontId ? item.user.frontId : '',
        avatar: item.user.avatar ? item.user.avatar : '',
        gender: item.user.gender ? item.user.gender : '',
        nationalId: item.user.nationalId ? item.user.nationalId : '',
        address: item.user.address ? item.user.address : '',
        email: item.user.email ? item.user.email : '',
        dob: item.user.dob ? item.user.dob : '',
      }));
    }
    return [];
  }, [pendingAcceptDepositList]);

  const profileTemp = {
    phoneNumber: '',
    nationalId: '',
    address: '',
    dob: '',
    email: '',
    gender: '',
    fullName: '',
    frontIdUser: '',
    backIdUser: '',
    avataIdUser: '',
  };
  const [profile, setProfile] = useState(profileTemp);
  const [isOpen, setIsOpen] = useState(false);

  function handleProfile(row) {
    profile.fullName = row.nameUser;
    profile.nationalId = row.nationalId;
    profile.address = row.address;
    profile.email = row.email;
    profile.dob = row.dob;
    profile.phoneNumber = row.phone;
    profile.gender = row.gender ? row.gender : 'Khác';
    profile.avataIdUser = row.avatar;
    profile.backIdUser = row.backId;
    profile.frontIdUser = row.frontId;
    setProfile(profile);

    toggleModal();
  }

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
    },
  };

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 120 },
    {
      field: 'nameUser',
      headerName: 'Người thuê',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'roomName',
      headerName: 'Phòng',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
    },
    {
      field: 'time',
      headerName: 'Thời gian',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
    },
    {
      field: 'payment_Method',
      headerName: 'Phương thức thanh toán',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'amount',
      headerName: 'Số tiền',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'keyPayment',
      headerName: 'Nội dung thanh toán',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'UNC',
      headerName: 'Minh chứng',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => (
        <a href={params.row.file} target="bank">
          LINK
        </a>
      ),
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'success',
      headerName: 'Chấp nhận',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      // eslint-disable-next-line consistent-return
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        if (params.row.status === 'Đang chờ duyệt') {
          return (
            <Button
              color="success"
              onClick={() => {
                /* eslint no-underscore-dangle: 0 */
                // eslint-disable-next-line no-undef
                setIdTransaction(params.row._id);
                // eslint-disable-next-line no-undef
                setStatus('success');
                // eslint-disable-next-line no-undef
                props.changeStoreData('showWarningapprove', true);
              }}
            >
              <i className="fa fa-check" aria-hidden="true">
                Chấp Nhận
              </i>
            </Button>
          );
        }
        return '';
      },
    },
    {
      field: 'error',
      headerName: 'Hủy',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      // eslint-disable-next-line consistent-return
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        if (params.row.status === 'Đang chờ duyệt') {
          return (
            <Button
              color="cancel"
              onClick={() => {
                /* eslint no-underscore-dangle: 0 */
                // eslint-disable-next-line no-undef
                setIdTransaction(params.row._id);
                // eslint-disable-next-line no-undef
                setStatus('cancel');
                // eslint-disable-next-line no-undef
                props.changeStoreData('showWarningapprove', true);
              }}
            >
              <i className="fa fa-check" aria-hidden="true">
                Không chấp nhận
              </i>
            </Button>
          );
        }
        return '';
      },
    },
    {
      field: 'user',
      headerName: 'Thông tin khách hàng',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => (
        <Button
          onClick={() => {
            handleProfile(params.row);
          }}
          color="primary"
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  const filteredColumns = columns.filter(column => {
    if (
      (role.length === 1) &&
      (column.field === 'error' || column.field === 'success')
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="user-profile-wrapper">
      <Helmet>
        <title>Accept Monthly Order</title>
        <meta
          name="description"
          content="Description of Accept Monthly Order"
        />
      </Helmet>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="deposit">
          <Row
            className="infor"
            style={{
              paddingTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h4>Thông Tin Cá Nhân</h4>
          </Row>
          <Row
            className="infor"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Col md={6}>
              <List>
                <ListItem>
                  <ListItemText secondary={`SĐT: ${profile.phoneNumber}`} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText secondary={`CMND: ${profile.nationalId}`} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText secondary={`Tên: ${profile.fullName}`} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText secondary={`Địa chỉ: ${profile.address}`} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText secondary={`Email: ${profile.email}`} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText secondary={`Giới Tính: ${profile.gender}`} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText
                    secondary={`Ngày Sinh: ${moment(profile.dob).format(
                      'DD/MM/YYYY',
                    )}`}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            </Col>
            <Col md={6}>
              <h5>Ảnh chân dung </h5>
              {profile.avataIdUser ? (
                <Avatar
                  style={{
                    width: '100%',
                    height: '200px',
                    margin: '10px auto',
                  }}
                  variant="square"
                  alt="Avatar"
                  src={profile.avataIdUser}
                />
              ) : (
                <Avatar
                  style={{
                    width: '100%',
                    height: '200px',
                    margin: '10px auto',
                  }}
                  variant="square"
                  alt="Avatar"
                >
                  N
                </Avatar>
              )}
            </Col>
          </Row>
          <Row className="infor">
            {/* Image */}

            <Col md={6}>
              {profile.frontIdUser ? (
                <Avatar
                  style={{
                    width: '100%',
                    height: '200px',
                    margin: '10px auto',
                  }}
                  variant="square"
                  alt="Avatar"
                  src={profile.frontIdUser}
                />
              ) : (
                <Avatar
                  style={{
                    width: '100%',
                    height: '200px',
                    margin: '10px auto',
                  }}
                  variant="square"
                  alt="Avatar"
                >
                  N
                </Avatar>
              )}
            </Col>
            <Col md={6}>
              {profile.backIdUser ? (
                <Avatar
                  style={{
                    width: '100%',
                    height: '200px',
                    margin: '10px auto',
                  }}
                  variant="square"
                  alt="Avatar"
                  src={profile.backIdUser}
                />
              ) : (
                <Avatar
                  style={{
                    width: '100%',
                    height: '200px',
                    margin: '10px auto',
                  }}
                  variant="square"
                  alt="Avatar"
                >
                  N
                </Avatar>
              )}
            </Col>
          </Row>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Button
            className="btn btn-secondary"
            onClick={toggleModal}
            color="primary"
          >
            Đóng
          </Button>
        </div>
      </Modal>
      {/* Breadcrumb */}
      <Breadcrumb className="">
        <BreadcrumbItem>
          <NavLink to={urlLink.home}>Home</NavLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NavLink to={urlLink.manageMonthlyOrder}>
            Thanh toán hàng tháng
          </NavLink>
        </BreadcrumbItem>
        <BreadcrumbItem>Duyệt hàng tháng</BreadcrumbItem>
      </Breadcrumb>

      <div className="title">Danh sách phê duyệt Thanh toán hàng tháng</div>
      <div className="job-list-wrapper container-fluid">
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={transformedData}
            columns={filteredColumns}
            pageSize={10}
            autoHeight
            isCellEditable={params => params.key}
          />
        </div>
      </div>
      <WarningPopup
        visible={showWarningapprove}
        content="Xác nhận thực hiện?"
        callBack={() => props.approvePendingPayDeposit(idTransaction, status)}
        toggle={() => {
          props.changeStoreData('showWarningapprove', false);
        }}
      />
      <SuccessPopup
        visible={showSuccessapprove}
        content="Thành công!"
        toggle={() => {
          props.changeStoreData('showSuccessapprove', !showSuccessapprove);
        }}
      />
    </div>
  );
}

ManagerAcceptMonthlyHost.propTypes = {
  pendingAcceptDepositList: PropTypes.object.isRequired,
  changeStoreData: PropTypes.func.isRequired,
  approvePendingPayDeposit: PropTypes.func.isRequired,
  getPayDepositList: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pendingAcceptDepositList: makeSelectPayDepositList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPayDepositList: id => {
      dispatch(getPayDepositList(id));
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    approvePendingPayDeposit: (idTransaction, status) => {
      dispatch(approvePendingPayDeposit(idTransaction, status));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ManagerAcceptMonthlyHost);
