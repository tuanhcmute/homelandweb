/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

import { DropzoneFile } from '../../../components/DropzoneFile';
import InputForm from '../../../components/InputForm';
import messages from '../../Job/messages';
import { urlLink } from '../../../helper/route';

const validationSchema = Yup.object().shape({
  file: Yup.mixed()
    .required()
    .test(
      'fileSize',
      'File too large',
      value => value && value.size <= 4096 * 1024,
    ), // 4MB
  bankId: Yup.string().required(),
});

export const UploadQuickRentForm = ({ bankInfo, uploadQuickRent }) => {
  const [selectedBank, setSelectedBank] = useState(undefined);
  const { id = '' } = useParams();

  const { setFieldValue, handleSubmit, errors, values } = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: {
      file: null,
      bankId: '',
    },
    onSubmit: values => {
      console.log(values);
      uploadQuickRent(values);
    },
  });

  const loadBankOptions = () => {
    if (bankInfo && _.isArray(bankInfo) && bankInfo.length !== 0) {
      return bankInfo.map(bankItem => ({
        label: bankItem.nameTkLable,
        value: bankItem._id,
        bankNumber: bankItem.stk,
        bankUsername: bankItem.nameTk,
      }));
    }
    return [];
  };

  return (
    <div>
      <div className="room__note">
        <div className="room__note-label">Lưu ý: </div>
        <p className="room__note-item">
          Chức năng này giúp chủ trọ có thể tạo nhiều hợp đồng cùng một lúc.
          Trong trường hợp có nhiều người thuê trọ đã thuê trọ trong thời gian
          chưa có hệ thống. Chủ trọ cần thực hiện điền các thông tin theo mẫu
          đơn và sau đó upload lên hệ thống. Hệ thống thực hiện kiểm tra các
          trường dữ liệu. Nếu dữ liệu hợp lệ hệ thống thực hiện tự động tạo các
          hợp đồng theo file đã được đẩy lên hệ thống.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col sm="6" className="mb-2 mt-2">
            <a
              href={`${urlLink.api.serverUrl}${
                urlLink.api.roomDetail
              }exportListRoomAbleRent/${id}`}
              target="_blank"
            >
              Danh sách phòng còn trống
            </a>
          </Col>
          <Col sm={6} className="mb-2">
            <a href="https://github.com/HomesLands/Homes-CMS-v2/raw/main/app/public/assets/Rent_Ex_V_EngHeaderxlsx.xlsx">
              Mẫu file excel thuê hàng loạt
            </a>
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="mt-2">
            <div>
              <DropzoneFile
                accept={{
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
                  'application/vnd.ms-excel': ['.xls', 'xlsx'],
                }}
                onDrop={acceptedFiles => {
                  if (_.isArray(acceptedFiles) && acceptedFiles.length > 0)
                    setFieldValue('file', acceptedFiles[0]);
                }}
                title="Click here or drop a excel file to upload"
              />
              {errors.file && (
                <span className="error__message">{errors.file}</span>
              )}
            </div>
          </Col>
          <Col md={12} className="mb-1">
            <div>
              <FormattedMessage {...messages.SelectBank}>
                {msg => (
                  <>
                    <label
                      style={{
                        fontSize: '14px',
                        marginBottom: '2px',
                        fontWeight: 'bold',
                      }}
                    >
                      <span>{msg}</span>
                    </label>
                    <Select
                      placeholder="Chọn ngân hàng"
                      options={loadBankOptions()}
                      onChange={selectedOption => {
                        setFieldValue('bankId', selectedOption.value);
                        setSelectedBank({
                          bankNumber: selectedOption.bankNumber,
                          bankUsername: selectedOption.bankUsername,
                        });
                      }}
                    />
                  </>
                )}
              </FormattedMessage>
              {errors.bankId && (
                <span className="error__message">{errors.bankId}</span>
              )}
            </div>
          </Col>
          {selectedBank && (
            <>
              <Col md={6}>
                <InputForm
                  label="Số tài khoản"
                  name="bankNumber"
                  value={selectedBank.bankNumber}
                  readOnly
                />
              </Col>
              <Col md={6}>
                <InputForm
                  label="Tên tài khoản"
                  name="bankUsername"
                  value={selectedBank.bankUsername}
                  readOnly
                />
              </Col>
            </>
          )}
        </Row>
        <div className="button-wrapper">
          <Button
            color="primary"
            type="submit"
            onClick={() => console.log(values)}
          >
            Hoàn thành
          </Button>
        </div>
      </form>
    </div>
  );
};

UploadQuickRentForm.propTypes = {
  bankInfo: PropTypes.array.isRequired,
  uploadQuickRent: PropTypes.func.isRequired,
};
