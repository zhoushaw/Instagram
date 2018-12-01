import { Service } from 'egg';
const qiniu = require('qiniu')

/**
 * Service
 */
interface qiniuOptioin {
    scope: string, // 存放空间 
    expires: number
}

export default class qiniuService extends Service {
    private accessKey: string = '';
    private secretKey: string = '';
    private publicBucketDomain = 'http://piyhxgz90.bkt.clouddn.com';

    private options: qiniuOptioin = {
        scope: 'instagram',
        expires: 7200
    }

    /**
     * 获取七牛上传token
     */
    public async getQiniuToken () {
        if (!this.accessKey || !this.secretKey || !this.publicBucketDomain) {
            this.ctx.throw(400, '请配置七牛鉴权参数')
        }
        let mac = new qiniu.auth.digest.Mac(this.accessKey, this.secretKey);
        let putPolicy = new qiniu.rs.PutPolicy(this.options);
        let uploadToken = putPolicy.uploadToken(mac);

        return uploadToken
    }

    /**
     * 上传图片
     */
     public async upload (stream: any) {

        let {ctx} = this

        let config = new qiniu.conf.Config();
        // 空间对应的机房
        config.zone = qiniu.zone.Zone_z2;

        // 初始化上传方法
        let formUploader  = new qiniu.form_up.FormUploader(config);
        let putExtra = new qiniu.form_up.PutExtra();
        // 获取上传token
        let uploadToken = this.getQiniuToken()
        
        formUploader.putFile(uploadToken, '', stream, putExtra, (respErr,
            respBody, respInfo) => {
            if (respErr) {
              throw respErr;
            }
            if (respInfo.statusCode == 200) {
                ctx.returnBody(200, "上传成功", {
                    key: respBody.key,
                    hash: respBody.hash,
                    url: this.publicBucketDomain
                })
            } else {
                ctx.returnBody(respInfo.statusCode, "上传失败")
            }
          });
     }


}
