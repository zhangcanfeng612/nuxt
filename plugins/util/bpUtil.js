import $Server from '@/server/index';
import _ from 'lodash';

let template = {};
export default {
  async onCreate (data, callback) {
    window.SERVER_PATH = '//editor.nutsbp.com';
    window.API_SERVER_PATH = `${$Server.api}/`;
    window.CONFIG_SERVER = `${$Server.cdn}/nutsbp-config/`;
    window.LANG_SERVER = `${$Server.cdn}/nutsbp-lang/`;
    template = data;

    if (window.NutsCanvaBpUtil) {
      return (JSON.parse(template.metadata).isFreeMode)
        ? this.onCreateFreeTemplate(callback)
        : this.onCreateOutlineTemplate(callback);
    } else {
      try {
        let timestamp = Date.parse(new Date());
        await this.loadJs(`${$Server.nutsCdn}/007/nuts-component/component/jquery/jquery-3.2.1.min.js?${timestamp}`);
        await this.loadJs(`${$Server.nutsCdn}/007/nuts-component/component/nuts-component/js/index-1.5.0.js?${timestamp}`);
        await this.loadJs(`${$Server.nutsCdn}/007/nuts-canva/component/bp-util/js/index-1.5.0.js?${timestamp}`);
        return (JSON.parse(template.metadata).isFreeMode)
          ? this.onCreateFreeTemplate(callback)
          : this.onCreateOutlineTemplate(callback);
      } catch (err) {
        err.message = '请求超时';
        return Promise.reject(new Error(err));
      }
    }
  },
  // 创建自由模板
  onCreateFreeTemplate (callback) {
    const url = `${$Server.api}/slide`;
    $Server.get(url, this.transferFreeSlideData(template))
      .then((res) => {
        callback(res);
      })
      .catch((err) => {
        callback(err);
      });
  },
  // 创建大纲模板
  onCreateOutlineTemplate (callback) {
    const industryId = 99; // 其他
    const stageId = 2; // 成长阶段

    const params = _.assign({}, {
      templateId: template.template_resource_id,
      industryId: industryId,
      stageId: stageId,
    });
    const url = `${$Server.api}/slide`;
    $Server.get(url, this.transferSlideData(params))
      .then((res) => {
        callback(res);
      })
      .catch((err) => {
        callback(err);
      });
    callback();
  },
  // 转换自由模板格式
  transferFreeSlideData (params) {
    const promiseTransfer = new Promise((resolve, reject) => {
      try {
        const nutsCanvaBpUtil = window.NutsCanvaBpUtil;
        nutsCanvaBpUtil.bpUtil.generateFreeModeData(params.template_resource_id, 2, params.url, function (pages, outline) {
          const slide = {
            template_resource_id: params.template_resource_id,
            data2: pages,
            data2_outline: outline,
            orientation: 2,
          };
          resolve(slide);
        });
      } catch (err) {
        console.error('err', err);
        const error = new Error({
          code: 400,
          msg: `Transfer data error`,
        });
        reject(error);
      }
    });
    return promiseTransfer;
  },
  // 转换大纲模板格式
  transferSlideData (params) {
    const promiseTransfer = new Promise((resolve, reject) => {
      try {
        const nutsCanvaBpUtil = window.NutsCanvaBpUtil;
        const industryId = params.industryId;
        const stageId = params.stageId;
        const templateId = params.templateId;
        nutsCanvaBpUtil.bpUtil.generateData(industryId, stageId, templateId, 2, function (pages, outline) {
          const slide = {
            industry_id: industryId,
            orientation: 2,
            privacy_id: 2,
            project_stage: stageId,
            template_resource_id: templateId,
            data2: pages,
            data2_outline: outline,
          };
          resolve(slide);
        });
      } catch (err) {
        console.error('err', err);
        const error = new Error({
          code: 400,
          msg: `Transfer data error`,
        });
        reject(error);
      }
    });
    return promiseTransfer;
  },

  // loadJS
  loadJs (url) {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      script.src = url;
      script.onload = () => {
        return resolve({
          code: 0,
        });
      };
      script.onerror = () => {
        return reject(new Error({
          code: 404,
          msg: 'The script is not found!',
        }));
      };
      document.body.appendChild(script);
    });
  },
};
