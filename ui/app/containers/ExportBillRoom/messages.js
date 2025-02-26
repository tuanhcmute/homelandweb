/*
 * RoomBill Messages
 *
 * This contains all the text for the RoomBill container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'RoomBill.containers';

export default defineMessages({
  expenseRoom: {
    id: `${scope}.expenseRoom`,
    defaultMessage: 'Chi Phí Phòng',
  },
  typeRoom: {
    id: `${scope}.typeRoom`,
    defaultMessage: 'Đơn Vị',
  },
  unitPriceRoom: {
    id: `${scope}.unitPriceRoom`,
    defaultMessage: 'Đơn Giá Phòng',
  },
  startDay: {
    id: `${scope}.startDay`,
    defaultMessage: 'Ngày Bắt Đầu (DD/MM/YYYY)',
  },
  endDay: {
    id: `${scope}.endDay`,
    defaultMessage: 'Ngày Kết Thúc (DD/MM/YYYY)',
  },
  startFilter: {
    id: `${scope}.startFilter`,
    defaultMessage: 'Từ Ngày (MM/DD/YYYY)',
  },
  endFilter: {
    id: `${scope}.endFilter`,
    defaultMessage: 'Đến Ngày (MM/DD/YYYY)',
  },
  totalRoom: {
    id: `${scope}.totalRoom`,
    defaultMessage: 'Tổng Tiền Phòng',
  },
  expenseElectricity: {
    id: `${scope}.expenseElectricity`,
    defaultMessage: 'Chi Phí Điện',
  },
  typeElectricity: {
    id: `${scope}.typeElectricity`,
    defaultMessage: 'Đơn Vị Điện',
  },
  unitPriceElectricity: {
    id: `${scope}.unitPriceElectricity`,
    defaultMessage: 'Đơn Giá Điện',
  },
  totalElectricity: {
    id: `${scope}.totalElectricity`,
    defaultMessage: 'Tổng Tiền Điện',
  },

  expenseWater: {
    id: `${scope}.expenseWater`,
    defaultMessage: 'Chi Phí Nước',
  },
  typeWater: {
    id: `${scope}.typeWater`,
    defaultMessage: 'Đơn Vị Nước',
  },
  unitPriceWater: {
    id: `${scope}.unitPriceWater`,
    defaultMessage: 'Đơn Giá Nước',
  },
  totalWater: {
    id: `${scope}.totalElectricity`,
    defaultMessage: 'Tổng Tiền Nước',
  },

  expenseGarbage: {
    id: `${scope}.expenseGarbage`,
    defaultMessage: 'Chi Phí Dịch Vụ',
  },
  typeGarbage: {
    id: `${scope}.typeGarbage`,
    defaultMessage: 'Đơn Vị Dịch Vụ',
  },
  unitPriceGarbage: {
    id: `${scope}.unitPriceGarbage`,
    defaultMessage: 'Đơn Giá Dịch Vụ',
  },
  totalGarbage: {
    id: `${scope}.totalGarbage`,
    defaultMessage: 'Tổng Tiền Dịch Vụ',
  },
  expenseWifi: {
    id: `${scope}.expenseWifi`,
    defaultMessage: 'Chi Phí Xe',
  },
  expenseWifiN: {
    id: `${scope}.expenseWifiN`,
    defaultMessage: 'Chi Phí Wifi',
  },
  typeWifi: {
    id: `${scope}.typeWifi`,
    defaultMessage: 'Đơn Vị Xe',
  },
  typeWifiN: {
    id: `${scope}.typeWifiN`,
    defaultMessage: 'Đơn Vị Wifi',
  },
  unitPriceWifi: {
    id: `${scope}.unitPriceWifi`,
    defaultMessage: 'Đơn Giá Xe',
  },
  unitPriceWifiN: {
    id: `${scope}.unitPriceWifiN`,
    defaultMessage: 'Đơn Giá Wifi',
  },
  totalWifi: {
    id: `${scope}.totalWifi`,
    defaultMessage: 'Tổng Tiền Xe',
  },
  totalWifiN: {
    id: `${scope}.totalWifiN`,
    defaultMessage: 'Tổng Tiền Wifi',
  },
  expenseOther: {
    id: `${scope}.expenseOther`,
    defaultMessage: 'Chi Phí Khác',
  },
  typeOther: {
    id: `${scope}.typeOther`,
    defaultMessage: 'Đơn Vị Khác',
  },
  unitPriceOther: {
    id: `${scope}.unitPriceOther`,
    defaultMessage: 'Đơn Giá Khác',
  },
  totalOther: {
    id: `${scope}.totalOther`,
    defaultMessage: 'Tổng Tiền Khác',
  },

  idBill: {
    id: `${scope}.idBill`,
    defaultMessage: 'Mã Hóa Đơn',
  },
  dateBill: {
    id: `${scope}.dateBill`,
    defaultMessage: 'Ngày Lập Hóa Đơn',
  },
  nameMotel: {
    id: `${scope}.nameMotel`,
    defaultMessage: 'Tên Khu Trọ',
  },
  nameRoom: {
    id: `${scope}.nameRoom`,
    defaultMessage: 'Tên Phòng',
  },
  nameUser: {
    id: `${scope}.nameUser`,
    defaultMessage: 'Tên Khách Thuê',
  },
  phoneUser: {
    id: `${scope}.phoneUser`,
    defaultMessage: 'Số ĐT Khác Thuê',
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: 'Địa Chỉ Thuê',
  },
  imgRoom: {
    id: `${scope}.imgRoom`,
    defaultMessage: 'Ảnh Phòng Trọ',
  },
  typeTaxAll: {
    id: `${scope}.typeTaxAll`,
    defaultMessage: 'Đơn vị Thuế',
  },
  totalTaxAll: {
    id: `${scope}.totalTaxAll`,
    defaultMessage: 'Tổng Thuế',
  },
  totalAll: {
    id: `${scope}.totalAll`,
    defaultMessage: 'Tổng Tiền',
  },
  totalAndTaxAll: {
    id: `${scope}.totalAndTaxAll`,
    defaultMessage: 'Tổng Cộng',
  },
});
