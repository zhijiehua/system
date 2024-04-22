/*
 * @Description: 复核有效数
 * @Author: huazj
 * @Date: 2024-04-13 19:37:35
 * @LastEditTime: 2024-04-13 19:37:58
 * @LastEditors: huazj
 */
const db = require('../../db/mysql');

const fuheyouxiao = async () => {
  const wfxw = "'8017', '8017A', '8001', '2009', '4208', '2007', '2004', '7013','8016','4206','4207','4210'";
  const hphm = "'未知','未识别到车牌','默A00000','无法识别'";
  const kssj = '2024-04-11 00:00:00';
  const jssj = '2024-04-12 00:00:00';
  let data = await db.query(
    `select tdi.glbm,count(distinct twer.id)
    from t_wf_ev_record twer
            left join t_device_info tdi on twer.device_id =tdi.id
            left join file_wfev_status fws on twer.id =fws.id
            left join (select parent_id,device_id from t_device_group tdg left join t_device_group_glsb tdgg on tdg.id=tdgg.sbz_id
            where tdg .lx ='7'
            and notEmpty(parent_id)) a on twer.device_id =a.device_id
            where tdi.del_flag ='0' and tdi.device_type ='7' and twer.status ='0'
            and twer.wfxw in('8017', '8017A', '8001', '2009', '4208', '2007', '2004', '7013','8016','4206','4207','4210')
            and twer.hphm not in('未知','未识别到车牌','默A00000','无法识别')
            and (
                (fws.yssj  >= '2024-04-12 00:00:00'
                and fws.yssj  <='2024-04-13 00:00:00'
                and fws.wfEv_status in('1','3'))
                and fws.ysczr !='admin@2023'
                or(fws.czsj  >= '2024-02-27 00:00:00'
                and fws.czsj  <= '2024-02-28 00:00:00'
                and fws.wfEv_status ='3')
                )
            group by a.parent_id
                group by tdi.glbm `,
    [wfxw, hphm, kssj, jssj]
  );
}

module.exports = fuheyouxiao