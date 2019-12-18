import React from "react";
import { connect } from "react-redux";
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import ReviewStatistics from "./ReviewStatistics";
import Reviews from "./Reviews";

function ReviewContent(props){
    const [activeTab, setActiveTab] = React.useState('review');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
    return(
        <div>
            <Nav tabs style={{borderBottom:'1px solid #C4C4C4'}}>
                <NavItem>
                    <NavLink
                        className={activeTab === 'review' ? "active":""}
                        id="review-tab"
                        onClick={() => { toggle('review'); }}
                    >
                        Review
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={activeTab === 'statistics' ? "active":""}
                        id="statistics-tab"
                        onClick={() => { toggle('statistics'); }}
                    >
                        Statistik
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="review">
                    <Reviews/>
                </TabPane>
                <TabPane tabId="statistics">
                    <ReviewStatistics/>
                </TabPane>
            </TabContent>
        </div>
    )
}

export default connect()(ReviewContent)