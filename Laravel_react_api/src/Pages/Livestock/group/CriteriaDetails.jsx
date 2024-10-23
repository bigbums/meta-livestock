import GroupCriteriaForm from "./GroupCriteria"; // The form we just created

function LivestockGroupDetails({ groupId }) {
  return (
    <div>
      <h1>Livestock Group Details</h1>
      <GroupCriteriaForm groupId={groupId} /> {/* Pass the groupId to the form */}
    </div>
  );
}

export default LivestockGroupDetails;
