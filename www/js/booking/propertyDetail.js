(function (document, window) {
    function getStorageData(keyName = '') {
        const data = localStorage.getItem(keyName) || '';
        return data ? JSON.parse(data) : null;
    }

    function getPropertyList() {
        return getStorageData('activityData');
    }

    function getOne(index, data) {
        for (const item of data) {
            if (item.index === index) {
                return item;
            }
        }
        return null;
    }

    function getPropertyDetail(index = '') {
        let data = {};
        if (index) {
            const currentProperties = getPropertyList();
            data = getOne(index, currentProperties);
        }
        return data || null;
    }

    function deleteProperty(index, properties) {
        for (const i in properties) {
            if (properties[i]['index'] === index) {
                properties.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('activityData', JSON.stringify(properties));
        window.location.href = './Search.html';
    }

    function appendDataToHTML(data) {
        console.log(data)
        let headerContent = '';
        headerContent += `<div class="astro">
            <img src="images/propertyDetail/${data['index']}.jpg" class="img-responsive" alt="image1" title="image1" />
            <div class="caption">
                <h3>Activity Name: ${data['name']}</h3>
                <h5><i class="icon_pencil-edit"></i>${data['reporter']}</h5>
            </div>
            <div>
                <input id="update-detail" number="${data['index']}" type="button" value="Update" />
                <input id="delete-detail" number="${data['index']}" type="button" value="Delete" />
            </div>
        </div>`;
        $('#header-detail').append(headerContent);
        $('#update-detail').on('click', function (ele) {
            const index = $(this).attr("number") || '';
            if (index) {
                localStorage.setItem('selectPropertyIndex', index);
                window.location.href = './EditProperty.html';
            }
        });
        $('#delete-detail').on('click', function (ele) {
            const activityData = JSON.parse(localStorage.getItem('activityData')) || '';
            const currentIndex = getStorageData('selectPropertyIndex');
            deleteProperty(currentIndex, activityData);
        });

        let footerContent = '<ul class="list-unstyled">';
        footerContent += `<li>
                <p>Location<span>${data.address}</span></p>
            </li>
      
    
            <li>
                <p>Date<span>${window.formatDate(data.createdAt)}</span></p>
            </li>
            <li>
                <p>Time Of Attending<span>${window.formatNumberToMoney(data.timeOfAttending)}</span></p>
            </li>
       
            <li>
            <p>${window.CONSTANT_DATA.LOCALE_VI.reporter}<span>${data.reporter}</span></p>
          </li>
            `

        footerContent += '</ul>';
        $('#footer-detail .detail').append(footerContent);
    }

    function initData() {
        const currentIndex = getStorageData('selectPropertyIndex');
        const propertyDetail = getPropertyDetail(currentIndex);
        console.log(1111, propertyDetail, currentIndex)
        appendDataToHTML(propertyDetail);
    }

    initData();
})(document, window);