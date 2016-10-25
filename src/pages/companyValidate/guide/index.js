/**
 * 企业核身引导页
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
        <ul className="guide-ul clearfix">
            <li className="bg1">
                <h4>工商注册资料</h4>
                <dl className=" lh-22">
                    <dt className="fn-pb-10">以下资料扫描件：</dt>
                    <dd>&bull;&nbsp;&nbsp;营业执照</dd>
                    <dd>&bull;&nbsp;&nbsp;组织机构代码证</dd>
                </dl>

            </li>
            <li className="bg2">
                <h4>其他资料</h4>
                <dl className=" lh-22">
                    <dt className="fn-pb-10">以下资料加盖公章并扫描：</dt>
                    <dd>&bull;&nbsp;&nbsp;法定代表人身份证明书 <br/>&nbsp;（<a href="javascript:" className="link-standard">模板下载</a>）</dd>
                    <dd>&bull;&nbsp;&nbsp;企业经办人授权委托书<br/>&nbsp;（<a href="javascript:" className="link-standard">模板下载</a>）</dd>
                    <dd>&bull;&nbsp;&nbsp;企业征信查询授权书<br/>&nbsp;（<a href="javascript:" className="link-standard">模板下载</a>）</dd>
                </dl>
            </li>
            <li className="bg3">
                <h4>个人资料</h4>
                <dl className=" lh-22">
                    <dd>&bull;&nbsp;&nbsp;法定代表人身份证信息<br/>&nbsp;
                        如您是经办人，还需准备：
                    </dd>
                    <dd>&bull;&nbsp;&nbsp;经办人身份证信息</dd>
                </dl>
            </li>
        </ul>

        <div className="text-align-center fn-pt-40">
            <div className="guide-text viceText-FontColor">
                <h4>资料要求：</h4>
                <ul className="lh-22">
                    <li>必须为清晰彩色原件扫描件或数码照，图片大小不超过10M，仅支持jpg,jpeg,bmp的图片格式。</li>
                    <li>必须在有效期内且年检章齐全（当年成立的公司可无年检章）</li>
                    <li>如果提交的证件错误，您的申请将不通过。</li>
                </ul>
            </div>
        </div>


        <div className="text-align-center fn-mt-20">
            <Button type="primary" size="large">我已准备好以上资料</Button>
        </div>

    </div>

    );
  }
}
