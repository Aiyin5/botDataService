const mysql = require('mysql');

class MysqlPool {
    constructor(config) {
        this.pool = mysql.createPool(config);
    }

    getConnection() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(connection);
                }
            });
        });
    }

    query(sql, args = []) {
        return new Promise(async (resolve, reject) => {
            const conn = await this.getConnection();
            conn.query(sql, args, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
                conn.release();
            });
        });
    }

    async select(tableName) {
        const sql = `SELECT * FROM ${tableName}`;
        return await this.query(sql);
    }

    async selectByWhere(tableName,where) {
        const whereConditions = Object.entries(where)
            .map(([key, value]) => `${key} = ${mysql.escape(value)}`)
            .join(' AND ');
        const sql = `SELECT * FROM ${tableName} WHERE ${whereConditions}`;
        return await this.query(sql);
    }

    async selectByPage(tableName,where,page,number,searchCondition) {
        let start = (page - 1) * number;
        let whereConditions = Object.entries(where)
            .map(([key, value]) => `${key} = ${mysql.escape(value)}`)
            .join(' AND ');
        let search="";
        if(searchCondition.flag){
            search = searchCondition.word;
            console.log(search)
            whereConditions="("+whereConditions+")"
            whereConditions+=" AND (prompt LIKE '%"+search+"%' OR completion LIKE '%"+search+"%')"
        }
        const sql1=`SELECT COUNT(1) FROM ${tableName} WHERE ${whereConditions}`;
        const sql2 = `SELECT * FROM ${tableName} WHERE ${whereConditions} ORDER BY id DESC limit ${start},${number}`;
        console.log(sql2)
        let data={};
        let co=await this.query(sql1);
        data.count = co[0]['COUNT(1)'];
        console.log(data.count)
        data.content= await this.query(sql2);
        return data;
    }
    async fileByPage(tableName,where,page,number,searchCondition) {
        let start = (page - 1) * number;
        let whereConditions = Object.entries(where)
            .map(([key, value]) => `${key} = ${mysql.escape(value)}`)
            .join(' AND ');
        let search="";
        if(searchCondition.flag){
            search = searchCondition.word;
            console.log(search)
            whereConditions="("+whereConditions+")"
            whereConditions+=" AND (doc_name LIKE '%"+search+"%' OR content LIKE '%"+search+"%')"
        }
        const sql1=`SELECT COUNT(1) FROM ${tableName} WHERE ${whereConditions}`;
        const sql2 = `SELECT * FROM ${tableName} WHERE ${whereConditions} ORDER BY id DESC limit ${start},${number}`;
        console.log(sql2)
        let data={};
        let co=await this.query(sql1);
        data.count = co[0]['COUNT(1)'];
        console.log(data.count)
        data.content= await this.query(sql2);
        return data;
    }


    async fileInfoByPage(tableName,where,page,number,searchCondition) {
        let start = (page - 1) * number;
        let whereConditions = Object.entries(where)
            .map(([key, value]) => `${key} = ${mysql.escape(value)}`)
            .join(' AND ');
        let search="";
        if(searchCondition.flag){
            search = searchCondition.word;
            console.log(search)
            whereConditions="("+whereConditions+")"
            whereConditions+=" AND (file_name LIKE '%"+search+"%' OR file_content LIKE '%"+search+"%')"
        }
        const sql1=`SELECT COUNT(1) FROM ${tableName} WHERE ${whereConditions}`;
        const sql2 = `SELECT * FROM ${tableName} WHERE ${whereConditions} ORDER BY id DESC limit ${start},${number}`;
        console.log(sql2)
        let data={};
        let co=await this.query(sql1);
        data.count = co[0]['COUNT(1)'];
        console.log(data.count)
        data.content= await this.query(sql2);
        return data;
    }

    async insert(tableName, data) {
        const keys = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => mysql.escape(value)).join(', ');
        const sql = `INSERT INTO ${tableName} (${keys}) VALUES (${values})`;
        return await this.query(sql);
    }

    async update(tableName, data, where) {
        const setValues = Object.entries(data)
            .map(([key, value]) => `${key} = ${mysql.escape(value)}`)
            .join(', ');
        const whereConditions = Object.entries(where)
            .map(([key, value]) => `${key} = ${mysql.escape(value)}`)
            .join(' AND ');
        const sql = `UPDATE ${tableName} SET ${setValues} WHERE ${whereConditions}`;
        return await this.query(sql);
    }

    async delete(tableName, where) {
        const whereConditions = Object.entries(where)
            .map(([key, value]) => `${key} = ${mysql.escape(value)}`)
            .join(' AND ');
        const sql = `DELETE FROM ${tableName} WHERE ${whereConditions}`;
        return await this.query(sql);
    }
}

module.exports = MysqlPool;
