/**
 * 个人核身引导页
 * xing
 */

import React from 'react';
import ReactDOM from 'react-dom';

// antd 组件
import { Button } from 'antd';

export default class Guide extends React.Component {
  render() {
    return (
    <div>
        <h3 className="fn-mb-40">请准备好以下资料：</h3>

        <ul className="guide-ul personal clearfix">
            <li className="bg1">
                <h4>个人征信授权书</h4>
                <dl className="lh-22">
                    <dt className="fn-pb-10">以下资料打印签名并扫描：</dt>
                    <dd>•&nbsp;&nbsp;个人征信查询授权书 <br/>（<a href="../../../resourceFiles/test1.pdf" className="link-standard">模板下载</a>）</dd>
                </dl>
            </li>
            <li className="bg2">
                <h4>身份证</h4>
                <dl className=" lh-22">
                    <dd className="fn-pb-10">•&nbsp;&nbsp;有效期内的二代身份证</dd>
                </dl>
            </li>
            <li className="bg3">
                <h4>个人资料</h4>
                <dl className=" lh-22">
                    <dd>•&nbsp;&nbsp;已开通网上银行的银行卡</dd>
                </dl>
            </li>
        </ul>

        <div className="text-align-center fn-pt-40">
            <div className="guide-text viceText-FontColor">
                <h4>资料要求：</h4>
                <ul className="lh-22">
                    <li>必须为清晰彩色原件扫描件或数码照，图片大小不超过10M，仅支持jpg,jpeg,bmp的图片格式。</li>
                    <li>如果提交的证件错误，您的申请将不通过。</li>
                </ul>
            </div>
        </div>
        <div className="text-align-center fn-mt-20">
            <Button type="primary" size="large"><a href="/#/personalValidate/step1?_k=REPLACE">我已准备好以上资料</a></Button>
        </div>

    </div>

    );
  }
}
