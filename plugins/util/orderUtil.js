import $Server from '@/server/index';
import _ from 'lodash';

export default {
  // 创建订单
  async onCreate () {

  },

  // 查询是否可以创建订单
  getActive () {},

  // 查询订单
  getOrder () {
    const url = (type === 'deliver') ? `${$Server.apiV3}/${type}/find` : `${$Server.apiV3}/${type}/log/find`;
    const data = {
      id: id,
      user: uuid,
    };
    return $Server.get(url, data);
  },

  // 获取优惠券信息
  getCoupon () {
    const url = `${$Server.apiV3}/coupon/query-user`;
    const data = {
      type: type,
      state: 0,
    };
    return $Server.get(url, data);
  },

  // 获取用户储值信息
  getBank () {
    const url = `${$Server.apiV3}/account/merge`;
    const data = {
      user: uuid,
    };
    return $Server.get(url, data);
  },

  // 查询当前订单占用的优惠券信息
  occupyCoupon () {
    const url = `${$Server.apiV3}/coupon/find`;
    const data = {
      id: id,
    };
    return $Server.get(url, data);
  },

  // 获取服务器时间 (需要修改: 服务器时间不能在服务器获取,会造成误差)
  getServerTime () {
    const url = `${$Server.apiV3}/tephra/ctrl/status`;
    const data = {};
    return $Server.get(url, data);
  },

  // 确定当前优惠券信息
  checkCoupon (couponList, occupyCoupon) {
    if (Object.keys(occupyCoupon).length === 0) {
      if (couponList.length !== 0) {
        return couponList[0];
      } else {
        return {};
      }
    } else {
      return occupyCoupon;
    }
  },
};
