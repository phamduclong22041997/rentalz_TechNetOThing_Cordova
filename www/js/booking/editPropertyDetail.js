(function (document, window) {
    class Property {
            constructor() {
                this.name = $('#name').val() || '';
                this.address = $('#address').val() || '';
                this.createdAt = $('#createdAt').val() || '';
                this.timeOfAttending = $('#timeOfAttending').val() || '';
                this.reporter = $('#reporter').val() || '';
            }
        getPropertyInfo() {
            let convertTimeStamp = '';
            if (this.createdAt) {
                convertTimeStamp = new Date(this.createdAt).getTime();
            }
            return {
                name: this.name,
                address: this.address,
                createdAt: convertTimeStamp, 
                timeOfAttending: this.timeOfAttending,
                reporter: this.reporter
            }
        }
    }

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

    function initFormInput(formData) {
        for (const key in formData) {
            const value = formData[key] || '';
            if (value === '') {
                continue;
            }
            if (key === 'createdAt') {
                const formatDate = window.convertDate(value);
                $(`#${key}`).val(formatDate);
                continue;
            }
            $(`#${key}`).val(value);
        }
    }

    function validateForm(data) {
        let isValid = true;
        for (const key in data) {
            const txt = window.CONSTANT_DATA.LOCALE_VI[key] || '';
            if (txt) {
                if (!data[key]) {
                    $(`#${key}`).css('border-color', 'red');
                    $(`#${key}`).focus();
                    window.toastMessage(`Please enter ${txt}`, 'error');
                    isValid = false;
                    break;
                } else {
                    if (key === 'createdAt') {
                        const value = $(`#${key}`).val();
                        if (value.indexOf('/') === -1) {
                            $(`#${key}`).val('');
                            window.toastMessage(`Please choose ${txt}`, 'error');
                            isValid = false;
                            break;
                        }
                    }
                    $(`#${key}`).css('border-color', 'green');
                }
            }
        }
        return isValid;
    }

    function update(index, data) {
        const activityData = localStorage.getItem('activityData') || '';
        let currentProperties = JSON.parse(activityData);
        for (const i in currentProperties) {
            if (currentProperties[i] &&
                currentProperties[i]['index'] === index) {
                currentProperties[i] = {
                    ...currentProperties[i],
                    ...data
                };
                localStorage.setItem('activityData', JSON.stringify(currentProperties));
            }
        }
    }

    function updateProperty(index, data) {
        const isValidFormData = validateForm(data);
        if (isValidFormData) {
            update(index, data);
            window.toastMessage('Update Success', 'success');
            setTimeout(()=> {
                window.location.href = './DetailsProperty.html';
            }, 1000);
        }
    }

    function initData() {
        const currentIndex = getStorageData('selectPropertyIndex');
        const propertyDetail = getPropertyDetail(currentIndex);
        initFormInput(propertyDetail);
    }

    initData();
    $('#update').on('click', function () {
        const property = new Property();
        const propertyInfo = property.getPropertyInfo();
        const currentIndex = getStorageData('selectPropertyIndex');
        updateProperty(currentIndex, propertyInfo);
    });
})(document, window);