import React, {Component} from 'react';
import './index.css';
/* Components */
import MenuItemGroup from "../../components/MenuItemGroup/index"
/* Mock Data */
import menuList from "../../data/menuList"

class Menu extends Component {
    state = {
        menuList,
    };

    onCheckMenuItem = (path, type) => (e) => {
        let {menuList} = this.state;

        let traversalMenuList = menuList;

        let nameVal = e.target.value;
        let isChecked = e.target.checked;

        let selectedMenuItems = path.split("|");

        if (type === "root") {
            traversalMenuList.map((menuItem) => {
                if (menuItem["name"] === nameVal) {
                    if (type === "root") {
                        if (menuItem.hasOwnProperty("isMenuSelected")) {
                            menuItem["isMenuSelected"] = isChecked;
                        } else {
                            menuItem["isMenuSelected"] = isChecked;
                        }
                    }
                }
            });
        }


        if (type === "choices") {
            traversalMenuList.map((menuItem) => {
                if (menuItem["name"] === selectedMenuItems[0].trim()) {
                    menuItem.choices.map((choice) => {
                        if (choice.name === selectedMenuItems[1].trim()) {
                            if (menuItem.hasOwnProperty("isChoiceSelected")) {
                                menuItem["isChoiceSelected"] = isChecked;
                            } else {
                                menuItem["isChoiceSelected"] = isChecked;
                            }
                        }
                    })
                }
            });
        }


        if (type === "related") {
            traversalMenuList.map((menuItem) => {
                if (menuItem["name"] === selectedMenuItems[0].trim()) {
                    menuItem.related.map((relatedItem) => {
                        if (relatedItem.name === selectedMenuItems[1].trim()) {
                            if (menuItem.hasOwnProperty("isRelatedItemSelected")) {
                                relatedItem["isRelatedItemSelected"] = isChecked;
                            } else {
                                relatedItem["isRelatedItemSelected"] = isChecked;
                            }
                        }
                    })
                }
            });
        }

        this.setState({
            ...this.state,
            menuList: traversalMenuList
        });


    };

    render() {
        const {menuList} = this.state;

        return (
            <div className="Menu" style={{margin: 20}}>
                <h1>Restaurant Menu</h1>

                {
                    menuList !== undefined ?
                        menuList.map((menuItem, menuItemKey) => (
                            <MenuItemGroup
                                className={"menu-item-group"}
                                key={menuItemKey}
                                name={menuItem.name}
                                choices={menuItem.hasOwnProperty("choices") ? menuItem.choices : []}
                                related={menuItem.hasOwnProperty("related") ? menuItem.related : []}
                                level={1}
                                path={menuItem.name}
                                type={'root'}
                                menuItemChecked={menuItem.hasOwnProperty("isMenuSelected") ? menuItem.isMenuSelected : false}
                                choiceChecked={menuItem.hasOwnProperty("isChoiceSelected") ? menuItem.isChoiceSelected : false}
                                onCheckMenuItem={this.onCheckMenuItem}
                            />
                        ))
                        : null
                }
            </div>
        );
    }
}

export default Menu;
