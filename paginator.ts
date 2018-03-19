import { NextFunction, Request, Response } from 'express';
import { Injectable } from '@angular/core';
import axios from 'axios';




// export function pag(req: Request, res: Response, next: NextFunction) {
//     paginationpost(endURL, payload);
// }


let paginationValue: number = 1000;
let jsonArr: any = [];

let paginationId = (new Date().getTime() / 1000 | 0).toString(16) + Math.ceil(Math.random() * 100000000000);



// let paginationId: number = Math.ceil(Math.random() * 100000000000);
let pageNo: any;
let payloadSize: number;

// export function paginationpost(endURL: string, payload: any, option: any, callback): any {
 export function paginationpost(endURL: string, payload: any, option: any, callback): any {
    let arr: any = [];
    let i: number, responseCount: number = 0, j = 0;
    let promise: any = [];
    for (i = 0; i < payload.length; i += paginationValue) {
        arr[j] = payload.substring(i, i + paginationValue);
        jsonArr[j] = {
            'id': paginationId,
            'pageno': (j + 1),
            'payloadSize': payload.length,
            'total': Math.ceil(payload.length / paginationValue),
            'data': arr[j]
        };
        // sending splitted jdp
        axios.post(endURL, jsonArr[j])
            // handling last jdp response
            .then(function (response) {
                if (response.status === 200) {
                    responseCount++;

                    if (responseCount === Math.ceil(payload.length / paginationValue)) {
                        // return "success! all jdp recieved";
                        // response.status(200).send("DONE!");
                        console.log('success! all jdp sent, recieved by BE');
                    } else
                        console.log(response.status);
                }
            })
            .catch(function (error) {
                console.log('error in axios ');
            });

        // this.http.post(endURL, payload, option)
        // .subscribe(
        // (response) => {
        //     console.log(response);
        //     callback(response);
        // },
        // (error) => {
        //     console.log('Error: ' + error);
        //     callback(error);
        // }
        // );

        j++;
    }
}
// ........................................................




