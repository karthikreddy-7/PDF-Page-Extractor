import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const config: TypeOrmModuleOptions={
    type:'postgres',
    port:46355,
    host:'roundhouse.proxy.rlwy.net',
    username:'postgres',
    password:'DmSUBwUnVcJBXamLtSsBjvBtvkUHnMyQ',
    database:'railway',
    synchronize: true,
    entities:['dist/**/*.entity{.ts,.js}']

};