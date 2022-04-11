(function (document, window) {
    window.CONSTANT_DATA = {
        furniture: {
            '1': 'Furniture',
            '2': 'Incomplete',
            '3': 'Partly Equipped'
        },
        LOCALE_VI: {
            name: 'Activity name',
            address: 'Location',
            createdAt: 'Date',
            timeOfAttending: 'Time of attending',
            reporter : 'Name of the reporter'
        }
    };
    window.formatNumberToMoney = function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    window.formatDate = function(day){
        console.log(day)
        var d = new Date(day) 
        var _day = d.getDay()
        var month = d.getMonth()+1
        var date = d.getDate()
        var year = d.getFullYear()       
        return  `${date}/${month}/${year}`
    }
    window.toastMessage = function(content, type) {
        const x = document.getElementById('snackbar');
        const msgType = `msg-${type}`;
        x.className = msgType;
        x.innerHTML = content;
        setTimeout(function () {
            x.className = x.className.replace(msgType, '');
        }, 3000);
    }
    window.convertDate = function(date) {
        const d = new Date(date);
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = d.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }
})(document, window);