/**
 * class to create/render table
 */
class Table {
    constructor(el, datas) {
        this.element = el;
        this.datas = datas;
    }
    render() {
        const table = document.createElement('table');
        table.className = 'table';

        const tableRow = document.createElement('tr');

        const tableHead = document.createElement('thead');
        tableHead.className = 'tableHead';

        const firstData = this.datas[0];
        const headtd = document.createElement('td');
        headtd.textContent = 'S.No';
        tableHead.append(headtd);
        for (const key in firstData) {
            const tableData = document.createElement('td');
            tableData.className = 'tableData';
            tableData.textContent = key;
            tableHead.append(tableData);
        }
        table.append(tableHead);

        this.datas.forEach((data, index) => {
            const tr = document.createElement('tr');
            const sNoTd = document.createElement('td');
            sNoTd.textContent = index + 1;
            tr.append(sNoTd);
            tr.id = `${index}`;
            for (const key in data) {
                const td = document.createElement('td');
                td.textContent = data[key];
                tr.append(td);
            }
            table.append(tr);
        })

        this.element.append(table);
    }
}
/**
 * class to create/render button
 */
class Button {
    constructor(el, btnType, btnId, btnLabel, callBackFn) {
        this.element = el;
        this.btnType = btnType;
        this.btnId = btnId;
        this.btnLabel = btnLabel;
        this.callBackFn = callBackFn;
    }
    render() {
        const button = document.createElement('button');
        button.className = "btn";
        button.id = this.btnId;
        button.type = this.btnType;
        button.textContent = this.btnLabel;

        button.addEventListener('click', e => {
            e.preventDefault();
            this.callBackFn(e);
        });

        this.element.append(button);
    }
}

/**
 * class to create/render input fields
 */
class InputField {
    constructor(labelName, inputFieldType, inputFieldName, element) {
        this.labelName = labelName;
        this.inputFieldType = inputFieldType;
        this.inputFieldName = inputFieldName;
        this.el = element;
    }
    render() {
        const div = document.createElement('div');
        div.className = 'row';

        const label = document.createElement('label');
        const input = document.createElement('input');
        label.htmlFor = this.inputFieldName;
        label.textContent = this.labelName;
        div.append(label);

        input.type = this.inputFieldType;
        input.name = this.inputFieldName;
        input.id = this.inputFieldName;
        input.placeholder = `enter your ${this.labelName}`;
        div.append(input);

        this.el.append(div);
    }
}


/**
 * class to create/render form element
 */
class DisplayForm {
    constructor(el) {
        this.rootElement = el;
    }
    render() {
        const form = document.createElement('form');
        form.id = 'userDetails';
        form.className = "form";

        const firstNameInputField = new InputField('First Name', 'text', 'firstname', form);
        firstNameInputField.render();

        const lastNameInputField = new InputField('Last Name', 'text', 'lastname', form);
        lastNameInputField.render();

        const cityInputField = new InputField('City', 'text', 'city', form);
        cityInputField.render();

        const countryInputField = new InputField('Country', 'text', 'country', form);
        countryInputField.render();

        this.rootElement.append(form);
        const datas = [];
        //Add Row to bottom button
        const btnAddToBottom = new Button(form, 'button', 'addBtnToBottom', 'Add Row To Bottom', (e) => {
            const tab = document.querySelector(".table");
            if (tab) {
                this.rootElement.removeChild(tab);
            }
            const firstname = document.getElementById('firstname').value;
            const lastname = document.getElementById('lastname').value;
            const city = document.getElementById('city').value;
            const country = document.getElementById('country').value;

            datas.push({ firstname, lastname, city, country });
            const table = new Table(this.rootElement, datas);
            table.render();
        });
        btnAddToBottom.render();

        //Add Row To Top button
        const btnAddToTop = new Button(form, 'button', 'addToTop', 'Add Row To Top', (e) => {
            const tab = document.querySelector(".table");
            if (tab) {
                this.rootElement.removeChild(tab);
            }
            const firstname = document.getElementById('firstname').value;
            const lastname = document.getElementById('lastname').value;
            const city = document.getElementById('city').value;
            const country = document.getElementById('country').value;

            datas.unshift({ firstname, lastname, city, country });
            const table = new Table(this.rootElement, datas);
            table.render();
        });
        btnAddToTop.render();

    }
}

class Main {
    constructor(rootEl) {
        this.rootEl = rootEl;
    }
    render() {
        const formEl = new DisplayForm(this.rootEl);
        formEl.render();
    }
}

const rootDiv = document.getElementById('root');
const main = new Main(rootDiv);
main.render();