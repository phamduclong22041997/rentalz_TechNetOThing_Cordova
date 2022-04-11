(function (document, window) {
    // Login Section
    if (window.name != 'homepage')
        return false;
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

    function clearFormData(formData) {
        for (const key in formData) {
            if (formData[key]) {
                $(`#${key}`).val('');
                $(`#${key}`).css('border-color', 'inherit');
            }
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
                    window.toastMessage(`Please input ${txt}`, 'error');
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

    function setDataLocalStorage(data) {
        const activityData = localStorage.getItem('activityData') || '';
        if (!activityData) {
            data['index'] = 1;
            const saveData = [data];
            localStorage.setItem('activityData', JSON.stringify(saveData));
        } else {
            const currentProperties = JSON.parse(activityData);
            if (data) {
                data['index'] = currentProperties.length + 1;
                currentProperties.push(data);
                localStorage.setItem('activityData', JSON.stringify(currentProperties));
            }
        }
    }

    function saveChecking() {
        const property = new Property();
        const propertyInfo = property.getPropertyInfo();
        const isValidFormData = validateForm(propertyInfo);
        if (isValidFormData) {
            setDataLocalStorage(propertyInfo);
            window.toastMessage('Create Activity Success', 'success');
        }
    }

    $('#confirm').on('click', function () {
        saveChecking();
    });
})(document, window);