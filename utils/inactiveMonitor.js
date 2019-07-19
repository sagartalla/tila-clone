import Cookie from 'universal-cookie';
const cookies = new Cookie();
import axios from 'axios';

function inactiveMonitor() {
    var t;
    window.onload = resetTimer;
    window.onmousemove = resetTimer; // catches mouse movements
    window.onmousedown = resetTimer; // catches mouse movements
    window.onclick = resetTimer;     // catches mouse clicks
    window.onscroll = resetTimer;    // catches scrolling
    window.onkeypress = resetTimer;  //catches keyboard actions

    function refresh() {
      const { refresh_token } =  cookies.get('auth') || {};
      if(!refresh_token) return;
      alert('inactive after login');
      return axios.post(`/api/refresh`, {
        'auth_version': 'V1',
        'refresh_token': refresh_token
      });
    }

   function resetTimer() {
      clearTimeout(t);
      t = setTimeout(refresh, 1800000);
    }
}


export default inactiveMonitor;
