import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMove } from "react-sortable-hoc";
import {
  PlusIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import gradeService from "../../services/grade.service";

export function StudentTabAssignment({ id }) {
  return (
    <div className=" ">
      <h1 className="text-2xl font-semibold text-gray-900">
        Assignments on Student side
      </h1>
    </div>
  );
}
