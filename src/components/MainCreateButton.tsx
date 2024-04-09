// DocumentButtons.tsx
import React, { useState } from "react";
import { Box, Button, Flex, Image, useDisclosure } from "@chakra-ui/react";
import { DescriptionModal } from "./DescriptionModal";
import { Document } from "./Document";

interface CreateButtonProps {
  onAdd: () => void;
}

// CreateButton component
export const CreateButton: React.FC<CreateButtonProps> = ({ onAdd }) => {
  const [savedDescription, setSavedDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box mr={{ base: "49px", md: "49px" }}>
      <Button
        onClick={onAdd}
        bg="#2F80ED"
        color="white"
        _hover={{ bg: "blue.600" }}
        _active={{ bg: "blue.700" }}
        borderRadius="10px"
        width="129px"
        height="48px"
        fontFamily="'DM Sans', sans-serif"
        fontSize="24px"
      >
        Create
      </Button>
      <DescriptionModal isOpen={isOpen} onClose={onClose} onSave={setSavedDescription} />
    </Box>
  );
};

// MainCreateButton component
export const MainCreateButton = () => {
  const initialDocuments: Document[] = [{ id: 1, content: "hi" }];
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);

  const handleAddNewDocument = () => {
    setCurrentDocument(null); 
    onOpen(); 
  };

  const handleSave = (updatedContent: string) => {
    if (currentDocument) {
      setDocuments((docs) =>
        docs.map((doc) =>
          doc.id === currentDocument.id ? { ...doc, content: updatedContent } : doc
        )
      );
    } else {
      const newDocument: Document = {
        id: documents.length ? Math.max(...documents.map((d) => d.id)) + 1 : 1,
        content: updatedContent,
      };
      setDocuments((docs) => [...docs, newDocument]);
    }
    onClose();
  };

  const handleDelete = () => {
    if (currentDocument) {
      setDocuments((docs) => docs.filter((doc) => doc.id !== currentDocument.id));
    }
    onClose();
  };

  const handleDocumentClick = (doc: Document) => {
    setCurrentDocument(doc);
    onOpen();
  };

  const renderDocumentButtons = () => {
    return documents.map((doc) => {
      const previewText =
        doc.content.split(" ").slice(0, 5).join(" ") +
        (doc.content.split(" ").length > 5 ? "..." : "");
      return (
        <Button
          key={doc.id}
          onClick={() => handleDocumentClick(doc)}
          bg="gray.100"
          color="black"
          borderColor="black"
          borderWidth="1px"
          marginLeft="2"
          _hover={{ bg: "gray.300" }}
          borderRadius="10px"
          width="150px"
          height="150px"
          fontFamily="'DM Sans', sans-serif"
          fontSize="24px"
          margin="20px"
          whiteSpace="normal"
          textOverflow="ellipsis"
        >
          {previewText}
        </Button>
      );
    });
  };

  return (
    <>
      <Flex align="center" wrap="wrap">
        <Button
          onClick={handleAddNewDocument}
          bg="#2F80ED"
          color="white"
          _hover={{ bg: "blue.600" }}
          _active={{ bg: "blue.700" }}
          borderRadius="10px"
          width="150px"
          height="150px"
          fontFamily="'DM Sans', sans-serif"
          margin="20px"
        >
          <Image src="create.png" alt="Create New" width="230%" height="230%" objectFit="cover"/>
        </Button>
        {renderDocumentButtons()}
        <DescriptionModal
          isOpen={isOpen}
          onClose={onClose}
          onSave={handleSave}
          onDelete={handleDelete}
          initialDescription={currentDocument?.content || ''}
        />
      </Flex>
      <Box position="fixed" top="20px" right="20px">
        <CreateButton onAdd={handleAddNewDocument} />
      </Box>
    </>
  );
};