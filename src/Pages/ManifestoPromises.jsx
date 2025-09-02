import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { Button, Select, Spin, Table, Typography,Tag , Grid } from "antd";
import { getAllManifestoList } from "../Store/Middleware/ManifestoServices";
import SpinnerService from "../Components/Spinner/SpinnerService";
import { useMessage } from "../Components/MessageModel/useMessage";
import HeaderNavbar from "../Components/HeaderNavbar";
import LoadingModal from "../Components/LoadingModal/LoadingModal";
import { useTranslation } from '../Components/LanguageSwitch/useTranslation';

import "./ManifestoPromises.scss";

// 🔹 Reusable Tree Component
const TreeItem = ({ label, count, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="ml-4 mt-1" style={{"margin-left":"30px"}}>
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 cursor-pointer p-1 rounded hover:bg-gray-100" style={{"margin-left":"30px"}}
      >
        {children ? (
          open ? <ChevronDown size={16} /> : <ChevronRight size={16} />
        ) : (
          <span style={{ width: 16 }} /> // empty space for leaf
        )}
        <span className="font-medium">
          {label} {count !== undefined && <span className="text-gray-500">({count})</span>}
        </span>
      </div>

      {open && children && (
        <div className="ml-6 border-l border-gray-200 pl-2">{children}</div>
      )}
    </div>
  );
};

const ManifestoPromises = () => {
  const dispatch = useDispatch();
  const { showMessage } = useMessage();

  const [manifesto, setManifesto] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { t } = useTranslation();
  
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobile = !screens.lg; 

  useEffect(() => {
    fetchAllManifesto();
  }, []);

  const fetchAllManifesto = () => {
    SpinnerService.show();
    dispatch(getAllManifestoList())
      .then((res) => {
        if (res.type.endsWith("rejected")) {
          setManifesto([]);
          showMessage("error", res.payload);
          return;
        }
        setManifesto(res.payload || []);
      })
      .catch((err) => console.log(err))
      .finally(() => SpinnerService.hide());
  };

  return (
    <>
      <HeaderNavbar />
      <div className="main-container p-4">
        <main className="main-content">
          <div className="content-wrapper w-full md:w-11/12 lg:w-10/12 xl:w-9/12 mx-auto">
            <center><h2 className="text-xl font-bold mb-4">{t('MANIFESTO.ManifestoPromises')}</h2></center>

            {/* Tree View */}
            <div className="tree-view bg-white shadow-md rounded p-4">
              {manifesto.length === 0 && <p>{t('MANIFESTO.NoManifestoPromises')}</p>}
              {manifesto.map((m) => (
				  <TreeItem key={m.id} label={m.party_type} count={m.total_count}>
					{m.elections?.map((e) => (
					  <TreeItem key={e.id} label={e.election_type} count={e.count} className="ml-4" >
						{e.years?.map((y) => {
						  // ✅ define datasource & columns inside for each y
						  const dataSource = y.promises?.map((p, index) => ({
							key: p.id,
							no: index + 1,
							title: p.title,
							description: p.detail_description || "-",
							status: p.status,
						  }));

							const groupedData = Object.values(
							  y.promises?.reduce((acc, p, index) => {
								const groupKey = `${y.id}::${p.title}`;

								if (!acc[groupKey]) {
								  const groupIndex = Object.keys(acc).length; // section index
								  acc[groupKey] = {
									key: groupKey,
									title: p.title,
									__isGroup: true,
									__groupIndex: groupIndex,
									children: [],
								  };
								}

								const localRowIndex = acc[groupKey].children.length; // index within this group

								acc[groupKey].children.push({
								  key: p.id,
								  no: index + 1,
								  description: p.detail_description || "-",
								  status: p.status,
								  __isLeaf: true,
								  __groupIndex: acc[groupKey].__groupIndex,
								  __localIndex: localRowIndex, // 🔹 index inside the section
								});

								return acc;
							  }, {})
							);

							
						  const columns = isMobile
							? [
								{
								  title: "Details",
								  key: "details",
								  render: (_, record) => (
									<div className="p-3 border rounded-lg shadow-sm bg-white mb-3">
									    {record.no && (<p><strong>{t('MANIFESTO.SNo')}:</strong> {record.no}</p>)}
										{record.title && (<p><strong>{t('MANIFESTO.Title')}:</strong> {record.title}</p>)}
										{record.description && (<p><strong>{t('MANIFESTO.Description')}:</strong> {record.description}</p>)}
									  {record.status && (<p>
										<strong>{t('MANIFESTO.Status')}:</strong>{" "}
										<Tag
										  color={
											record.status === "Completed"
											  ? "green"
											  : record.status === "In Progress"
											  ? "gold"
											  : "gray"
										  }
										>
										  {record.status}
										</Tag>
									  </p>)}
									</div>
								  ),
								},
							  ]
							: [
								{
								  title: t('MANIFESTO.SNo'),
								  dataIndex: "no",
								  key: "no",
								},
								{
								  title: t('MANIFESTO.Title'),
								  dataIndex: "title",
								  key: "title",
								},
								{
								  title: t('MANIFESTO.Description'),
								  dataIndex: "description",
								  key: "description",
								},
								{
								  title: t('MANIFESTO.Status'),
								  dataIndex: "status",
								  key: "status",
								  render: (status) => {
									let color = "default";
									if (status === "Completed") color = "green";
									else if (status === "In Progress") color = "gold";
									else color = "gray";
									return <Tag color={color}>{status}</Tag>;
								  },
								},
							  ];

						  return (
							<TreeItem key={y.id} label={y.year} count={y.count}>
							  <Table
								dataSource={groupedData}
								columns={columns}
								pagination={{
								  responsive: true,
								  showSizeChanger: true,
								  pageSize: 20,
								  className: "px-2 sm:px-4",
									showQuickJumper: true,
									showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
								}}
								className="mt-4 sm:mt-6"
								scroll={{ x: true }}
								  rowClassName={(record) => {
									// If it is a group header
									if (record.__isGroup) {
									  return "section-header";
									}

									// If it is a leaf row inside a section
									if (record.__isLeaf) {
									  return record.__localIndex % 2 === 0
										? "section-row-light"
										: "section-row-dark";
									}

									return "";
								  }}
							  />
							</TreeItem>
						  );
						})}
					  </TreeItem>
					))}
				  </TreeItem>
			))}

            </div>
          </div>
        </main>
      </div>

      <LoadingModal isOpen={isModalOpen} message={modalMessage} />
    </>
  );
};

export default ManifestoPromises;
