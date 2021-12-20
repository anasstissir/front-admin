import React from "react";
import { Card, CardBody, CardTitle, Progress } from "reactstrap";

import IntlMessages from "../../helpers/IntlMessages";

const QuestionStatuses = ({cardClass="h-100" , questions}) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="pages.listedesquestions" />
        </CardTitle>
        {questions && questions.map((s, index) => {
          return (
            <div key={index} className="mb-4">
              <p className="mb-2">
                {s.title}
                <span className="float-right text-muted">
                  {s.tauxResponse}/{s.numberResponses}
                </span>
              </p>
              <Progress value={(s.tauxResponse / s.numberResponses) * 100} />
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};
export default QuestionStatuses;
