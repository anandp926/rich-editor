/*
 * __author__ = 'Kanishka Mohan Madhuni <kmmadhuni@gmail.com>'
 * __copyright__ = 'Copyright (C) 2018 Ethereal Machines Pvt. Ltd. All rights reserved'
 */

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.109:8000/v1'
});

export default instance;
